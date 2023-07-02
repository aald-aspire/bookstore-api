import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'

export default class UsersController {

    /**
    * @swagger
    * /users/login:
    *   post:
    *     summary: User Login Endpoint
    *     tags:
    *       - Users
    *     requestBody:
    *       description: User Login Credentials Payload
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               email:
    *                 type: string
    *               password:
    *                 type: string
    *               expires_at:
    *                 type: string
    *                 format: date-time
    *     responses:
    *       200:
    *         description: Login Successful
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                   type:
    *                     type: string
    *                     example: 'bearer'
    *                   token:
    *                     type: string
    *       401:
    *         description: Unauthorized (Due to invalid credentials for example)
    *       503:
    *         $ref: '#/components/responses/ServiceUnavailable'
    */
	public async login(ctx: HttpContextContract) {
		const userInfo = ctx.request.body()

		try {
			const oat = await ctx.auth.use('api').attempt(userInfo.email, userInfo.password, {
                expiresIn: Env.get('API_TOKEN_LIFETIME')
            })

			return ctx.response.ok(oat)
		} catch (throwable) {
			// console.log(throwable)

            let error: any = null

			if(throwable.errno === -113)
				error = ctx.response.serviceUnavailable({message: 'Service Unavailable, Try Again Later'})

			if(error === null)
				error = ctx.response.unauthorized()

			return error
		}

	}


    /**
    * @swagger
    * /users/logout:
    *   post:
    *     summary: User Logout Endpoint
    *     tags:
    *       - Users
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       200:
    *         description: Logout Successful
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                   message:
    *                     type: string
    *                     example: 'Logged Out Successfully'
    *       401:
    *         $ref: '#/components/responses/Unauthorized'
    *       500:
    *         $ref: '#/components/responses/InternalServerError'
    */
	public async logout(ctx: HttpContextContract) {
		try {
            ctx.auth.use('api').logout()
            return ctx.response.ok({message: 'Logged Out Successfully'})
        } catch (throwable) {
            // console.log(throwable)
            return throwable
        }
	}


    /**
    * @swagger
    * /users/add:
    *   post:
    *     summary: Add New User Endpoint
    *     tags:
    *       - Users
    *     requestBody:
    *       description: User Payload
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/User'
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       200:
    *         description: User created successfully
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *                   example: 'User Created Successfully'
    *       401:
    *         $ref: '#/components/responses/Unauthorized'
    *       409:
    *         description: User Already Exists
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *                   example: 'User Already Exists'
    *       500:
    *         $ref: '#/components/responses/InternalServerError'
    *       503:
    *         $ref: '#/components/responses/ServiceUnavailable'
    */
	public async add(ctx: HttpContextContract) {
		const userInfo = ctx.request.body()

		try {
			await User.create({
				name: userInfo.name,
				email: userInfo.email,
				password: userInfo.password,
				role: userInfo.role ?? 'user',
				rememberMeToken: userInfo.rememberMeToken ?? null,
                created_by: ctx.auth.user.id
			});

			return ctx.response.created({message: 'User Created Successfully'})
		} catch(throwable) {
            // console.log(throwable)

            let error: any = null

            if(throwable.errno === 1062)
                error = ctx.response.conflict({message: 'User Already Exists'})

            if(throwable.errno === -113)
                error = ctx.response.serviceUnavailable({message: 'Service Unavailable, Try Again Later'})

            if(error === null)
                error = ctx.response.internalServerError({message: 'Unknown Server Error'})

			return error
		}
	}
}
