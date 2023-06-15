import { test } from '@japa/runner'
import Route from '@ioc:Adonis/Core/Route'

test.group('Add User', () => {
	test('New User', async ({client}) => {
		const userInfo = {
			username: "Test User Name",
			email: "testuser@host.com",
			password: "userpassword"
		}

		const userAddRes = await client.post(Route.makeUrl('users.add')).json(userInfo)

		userAddRes.assertStatus(201)

		test('New Redundant User', async ({client}) => {
			const userAddRes = await client.post(Route.makeUrl('users.add')).json(userInfo)

			userAddRes.assertStatus(409)
		})

		test('User Login', async ({client}) => {
			const userLoginRes = await client.post(Route.makeUrl('users.login')).json({
				email: userInfo.email,
				password: userInfo.password
			})

			userLoginRes.assertStatus(200)
		})
	})

	test('New Admin User', async ({client}) => {
		const adminInfo = {
			username: "Test Admin Name",
			email: "testadmin@host.com",
			password: "adminpassword",
			role: "admin"
		}

		const adminAddRes = await client.post(Route.makeUrl('users.add')).json(adminInfo)

		adminAddRes.assertStatus(201)
	})
})
