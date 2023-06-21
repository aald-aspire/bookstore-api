import { test } from '@japa/runner'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import Author from 'App/Models/Author'
import Book from 'App/Models/Book'

test.group('User', () => {
	const user = User.findBy('email', 'superadmin@host.com')

	test('New User', async ({client}) => {
		const userInfo = {
			name: "Test User Name",
			email: "testuser@host.com",
			password: "userpassword"
		}

		const userAddRes = await client.post(Route.makeUrl('users.add')).json(userInfo).guard('api').loginAs(user)
		userAddRes.assertStatus(201)

		test('New Redundant User', async ({client}) => {
			const userAddRes = await client.post(Route.makeUrl('users.add')).json(userInfo).guard('api').loginAs(user)
			userAddRes.assertStatus(409)
		})

		test('User Login/Logout', async ({client}) => {
			const userLoginRes = await client.post(Route.makeUrl('users.login')).json({
				email: userInfo.email,
				password: userInfo.password
			})
			userLoginRes.assertStatus(200)
		})
	})

	test('New Admin User', async ({client}) => {
		const adminInfo = {
			name: "Test Admin Name",
			email: "testadmin@host.com",
			password: "adminpassword",
			role: "admin"
		}

		const adminAddRes = await client.post(Route.makeUrl('users.add')).json(adminInfo).guard('api').loginAs(user)
		adminAddRes.assertStatus(201)
	})
})


test.group('Author', () => {
	const user = User.findBy('email', 'superadmin@host.com')

	const authorInfo = {
		name: "Test Author Name",
		biography: "Test Author Biography"
	}

	let testAuthorId = ''

	test('New Author', async ({client}) => {

		const authorAddRes = await client.post(Route.makeUrl('authors.add')).json(authorInfo).guard('api').loginAs(user)
		authorAddRes.assertStatus(201)

		testAuthorId = authorAddRes.body().id
	})

	test('New Redundant Author', async ({client}) => {
		const authorConflictRes = await client.post(Route.makeUrl('authors.add')).json(authorInfo).guard('api').loginAs(user)
		authorConflictRes.assertStatus(409)
	})

	test('List Authors', async ({client}) => {
		//Add check for record count
		const authorsListRes = await client.get(Route.makeUrl('authors.index')).guard('api').loginAs(user)
		authorsListRes.assertStatus(200)
	})

	test('Update Author', async ({client}) => {

		const authorInfoMod = {
			name: "Mod Test Author Name",
			biography: authorInfo.biography
		}

		const authorModRes = await client.put(Route.makeUrl('authors.edit', {id: testAuthorId})).json(authorInfoMod).guard('api').loginAs(user)
		authorModRes.assertStatus(200)
	})
})


test.group('Books', () => {

	const user = User.findBy('email', 'superadmin@host.com')

	const bookInfo = {
		title: "Test Book Title",
		author: null,
		isbn: "testbookisbn",
		description: "Test Book Description",
		price: 1.00,
		quantity: 50
	}

	let testBookId = ''

	test('New Book', async ({client}) => {

		const author = await Author.findBy('name', 'Mod Test Author Name')
		bookInfo.author = author.id

		const bookAddRes = await client.post(Route.makeUrl('books.add')).json(bookInfo).guard('api').loginAs(user)
		bookAddRes.assertStatus(201)

		testBookId = bookAddRes.body().id
	})

	test('New Redundant Book', async ({client}) => {
		const bookConflictRes = await client.post(Route.makeUrl('books.add')).json(bookInfo).guard('api').loginAs(user)
		bookConflictRes.assertStatus(409)
	})

	test('List Books', async ({client}) => {
		//Add check for record count
		const booksListRes = await client.get(Route.makeUrl('books.index')).guard('api').loginAs(user)
		booksListRes.assertStatus(200)
	})

	test('Update Book', async ({client}) => {

		const bookInfoMod = {
			title: "Mod Test Book Title",
			author: bookInfo.author,
			isbn: bookInfo.isbn,
			description: bookInfo.description,
			price: 1.25,
			quantity: 24
		}

		const bookModRes = await client.put(Route.makeUrl('books.edit', {id: testBookId})).json(bookInfoMod).guard('api').loginAs(user)
		bookModRes.assertStatus(200)
	})
})

test.group('Removal', () => {

	const user = User.findBy('email', 'superadmin@host.com')
	let author = null

	test('Delete Author Contraints', async ({client}) => {
		author = await Author.findBy('name', 'Mod Test Author Name')

		if(author === null)
			author = await Author.findByOrFail('name', 'Test Author Name')

		const authorDelRes = await client.delete(Route.makeUrl('authors.remove', {id: author.id})).guard('api').loginAs(user)
		authorDelRes.assertStatus(409)		
	})

	test('Delete Book', async ({client}) => {
		let book = await Book.findBy('title', 'Mod Test Book Title')

		if(book === null)
			book = await Book.findByOrFail('title', 'Test Book Title')

		const bookDelRes = await client.delete(Route.makeUrl('books.remove', {id: book.id})).guard('api').loginAs(user)
		bookDelRes.assertStatus(200)
	})

	test('Delete Author', async ({client}) => {
		const authorDelRes = await client.delete(Route.makeUrl('authors.remove', {id: author.id})).guard('api').loginAs(user)
		authorDelRes.assertStatus(200)
	})
})