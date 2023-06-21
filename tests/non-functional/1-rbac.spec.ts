import { test } from '@japa/runner'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import Author from 'App/Models/Author'

test.group('Rbac', () => {

	test('User Rbac - New Author', async ({client}) => {
		const userInfo = {
			name: "Rbac Test User",
			email: "rbactestuser@host.com",
			password: "userpassword",
			role: 'user'
		}

		const testUser = await User.create(userInfo)
		const testAuthor = await Author.create({
			name: "Test Author Name - User Rbac",
			biography: "Test Author Biography - User Rbac"
		})
		
		const authorUserAddRes = await client.put(Route.makeUrl('authors.edit', {id: testAuthor.id})).json({
			name: "Mod Test Author Name - User Rbac",
			biography: "Test Author Biography - User Rbac"
		}).guard('api').loginAs(testUser)

		await testUser.delete()
		await testAuthor.delete()

		authorUserAddRes.assertStatus(403)
	})

	test('Admin Rbac - New Author', async ({client}) => {
		const adminInfo = {
			name: "Rbac Test Admin",
			email: "rbactestadmin@host.com",
			password: "adminpassword",
			role: 'admin'
		}

		const testAdmin = await User.create(adminInfo)
		const testAuthor = await Author.create({
			name: "Test Author Name - Admin Rbac",
			biography: "Test Author Biography - Admin Rbac"
		})

		const authorAdminAddRes = await client.put(Route.makeUrl('authors.edit', {id: testAuthor.id})).json({
			name: "Mod Test Author Name - Admin Rbac",
			biography: "Test Author Biography - Admin Rbac"
		}).guard('api').loginAs(testAdmin)

		await testAdmin.delete()
		await testAuthor.delete()

		authorAdminAddRes.assertStatus(200)
	})
})
