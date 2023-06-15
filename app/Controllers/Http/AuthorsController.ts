import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Author from 'App/Models/Author'

export default class AuthorsController {
	public async index(ctx: HttpContextContract) {
		try {
			const authors = await Author.all()
			return authors
		} catch (error) {
			console.log(error)
			return ctx.response.internalServerError({message: 'Unknown Server Error'})
		}
	}

	public async add(ctx: HttpContextContract) {
		const authorInfo = await ctx.request.body()

		try {
			const author = await Author.create({
				name: authorInfo.name,
				biography: authorInfo.biography
			});

			return ctx.response.created({uuid: author.id, created_at: author.createdAt})
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
