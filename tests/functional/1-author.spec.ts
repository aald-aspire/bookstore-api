import { test } from '@japa/runner'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

test.group('Add Author', () => {
	const user = User.findBy('email', 'testadmin@host.com')

	const authorInfo = {
		name: "Test Author Name",
		biography: "Test Author Biography"
	}

	test('New Author', async ({client}) => {

		const authorAddRes = await client.post(Route.makeUrl('authors.add')).json(authorInfo).guard('api').loginAs(user)

		authorAddRes.assertStatus(201)

		test('New Redundant Author', async ({client}) => {
			const authorAddRes = await client.post(Route.makeUrl('authors.add')).json(authorInfo).guard('api').loginAs(user)

			authorAddRes.assertStatus(409)
		})
	})

	//TODO: Add test to update record

	test('List Authors', async ({client}) => {
		//Add check for record count
		const authorAddRes = await client.get(Route.makeUrl('authors.index')).guard('api').loginAs(user)
		authorAddRes.assertStatus(200)
	})

	//TODO: Add test to remove record
})
