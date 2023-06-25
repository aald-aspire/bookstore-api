import { test } from '@japa/runner'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

test.group('Auth', (group) => {
	const userInfo = {
		name: "Auth Test User Name",
		email: "authtestuser@host.com",
		password: "userpassword",
		role: "user"
	}

	let testUser: any = null

	test('OAT Login/Logout', async ({client, assert}) => {
		await User.create(userInfo)

		const userLoginRes = await client.post(Route.makeUrl('users.login')).json({
			email: userInfo.email,
			password: userInfo.password
		})

		userLoginRes.assertStatus(200)

		assert.strictEqual(userLoginRes.type(), 'application/json')

		assert.properties(userLoginRes.body(), ['type', 'token', 'expires_at'])

		const userUnauthorizedLogoutRes = await client.post(Route.makeUrl('users.logout'))
		userUnauthorizedLogoutRes.assertStatus(401)

		const oat = userLoginRes.body().token

		const userLogoutRes = await client.post(Route.makeUrl('users.logout')).header('Authorization', 'Bearer ' + oat)
		userLogoutRes.assertStatus(200)
	})

	group.teardown(async () => {
		testUser = await User.findBy('email', userInfo.email)

		if(testUser !== null)
			await testUser.delete()
	})
})