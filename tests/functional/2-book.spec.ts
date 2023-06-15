import { test } from '@japa/runner'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import Author from 'App/Models/Author'

test.group('Add Book', () => {

	const user = User.findBy('email', 'testadmin@host.com')
	const authorId = Author.findBy('name', 'Test Author Name').id

	const bookInfo = {
		title: "Test Book Title",
		author: authorId,
		isbn: "testbookisbn",
		description: "Test Book Description",
		price: 1.00,
		quantity: 50
	}

	test('New Book', async ({client}) => {

		const bookAddRes = await client.post(Route.makeUrl('books.add')).json(bookInfo).guard('api').loginAs(user)

		bookAddRes.assertStatus(201)

		test('New Redundant Book', async ({client}) => {
			const bookAddRes = await client.post(Route.makeUrl('books.add')).json(bookInfo).guard('api').loginAs(user)

			bookAddRes.assertStatus(409)
		})

		//TODO: Add tests to update, list and remove record
	})
})
