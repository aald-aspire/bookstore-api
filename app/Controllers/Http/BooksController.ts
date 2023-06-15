import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BooksController {
	public async index(ctx: HttpContextContract) {
		try {
			const books = await Book.all()
			return books
		} catch (error) {
			console.log(error)
			return ctx.response.internalServerError({message: 'Unknown Server Error'})
		}
	}

	public async add(ctx: HttpContextContract) {
		const bookInfo = await ctx.request.body()

		try {
			const book = await Book.create({
				title: bookInfo.title,
				author: bookInfo.author,
				isbn: bookInfo.isbn,
				description: bookInfo.description ?? '',
				price: bookInfo.price,
				quantity: bookInfo.quantity
			});

			return ctx.response.created({uuid: book.id, created_at: book.createdAt})
		} catch(exception) {
			console.log(exception)

			var error = null;

			if(exception.errno === 1062)
				error = ctx.response.conflict({message: 'Book Already Exists'})

			if(error === null)
				error = ctx.response.internalServerError({message: 'Unknown Server Error'})

			return error
		}
	}

	//TODO: Add api for show, edit and remove
}
