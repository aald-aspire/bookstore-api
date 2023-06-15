import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
	public async login(ctx: HttpContextContract) {
		const userInfo = ctx.request.body()

		try {
			console.log({email: userInfo.email, password: userInfo.password})
			const oat = await ctx.auth.use('api').attempt(userInfo.email, userInfo.password)
			return ctx.response.ok(oat)
		} catch (error) {
			console.log(error)
			return ctx.response.unauthorized()
		}

	}

	public async logout(ctx: HttpContextContract) {
		//TODO: Complete this action
	}

	public async add(ctx: HttpContextContract) {
		const userInfo = ctx.request.body()

		try {
			const user = await User.create({
				name: userInfo.name,
				email: userInfo.email,
				password: userInfo.password,
				role: userInfo.role ?? 'user'
			});

			return ctx.response.created()
		} catch(exception) {
			console.log(exception)

			var error = null;

			if(exception.errno === 1062)
				error = ctx.response.conflict({message: 'User Already Exists'})

			if(error === null)
				error = ctx.response.internalServerError({message: 'Unknown Server Error'})

			return error
		}
	}
}
