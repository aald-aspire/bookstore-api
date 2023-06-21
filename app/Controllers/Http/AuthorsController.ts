import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@poppinss/utils'
import Author from 'App/Models/Author'

export default class AuthorsController {

	/**
    * @swagger
    * /authors/:
    *   get:
    *     summary: Lists available Author records
    *     tags:
    *       - Authors
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       200:
    *         description: List of Author Records
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 $ref: '#/components/schemas/Author'
    *       204:
    *         $ref: '#/components/responses/NoContent'
    *       401:
    *         $ref: '#/components/responses/Unauthorized'
    *       500:
    *         $ref: '#/components/responses/InternalServerError'
    */
	public async index(ctx: HttpContextContract) {
		
		const authors = await Author.all()

		return authors
	}


	/**
    * @swagger
    * /authors/{id}:
    *   get:
    *     summary: Get an Author record by ID
    *     tags:
    *       - Authors
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: id of the requested Author record
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       200:
    *         description: The Requested Author Record
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Author'
    *       401:
    *         $ref: '#/components/responses/Unauthorized'
    *       404:
    *         $ref: '#/components/responses/NotFound'
    *       500:
    *         $ref: '#/components/responses/InternalServerError'
    */
	public async show(ctx: HttpContextContract) {
		
		const author = await Author.find(ctx.params.id)

		if(author === null)
			throw new Exception(
				'Requested record not found',
		        404,
		        'E_NOT_FOUND'
			)

		return author
	}


	/**
    * @swagger
    * /authors/:
    *   post:
    *     summary: Add New Author Endpoint
    *     tags:
    *       - Authors
    *     requestBody:
    *       description: Author Payload
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Author'
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       201:
    *         description: Author created successfully
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Author'
    *       401:
    *         $ref: '#/components/responses/Unauthorized'
    *       409:
    *         description: Author Already Exists
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *                   example: 'Author Already Exists'
    *       500:
    *         $ref: '#/components/responses/InternalServerError'
    */
	public async add(ctx: HttpContextContract) {
		const authorInfo = await ctx.request.body()

		try {
			const author = await Author.create({
				name: authorInfo.name,
				biography: authorInfo.biography
			});

			return ctx.response.created(author)
		} catch(throwable) {
			// console.log(throwable)

			if(throwable.errno === 1062)
				return ctx.response.conflict({message: 'Author Already Exists'})

			throw throwable
		}
	}


	/**
    * @swagger
    * /authors/{id}:
    *   put:
    *     summary: Modify An Existing Author Record Endpoint
    *     tags:
    *       - Authors
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: id of the requested Author record
    *     requestBody:
    *       description: Author Payload
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Author'
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       200:
    *         description: Author record updated successfully
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Author'
    *       401:
    *         $ref: '#/components/responses/Unauthorized'
    *       404:
    *         $ref: '#/components/responses/NotFound'
    *       500:
    *         $ref: '#/components/responses/InternalServerError'
    */
	public async edit(ctx: HttpContextContract) {
		const authorInfo = ctx.request.body()
		const author = await Author.find(ctx.params.id)

		if(author === null)
			throw new Exception(
				'Requested record not found',
		        404,
		        'E_NOT_FOUND'
			)

		author.fill(authorInfo)
		author.id = ctx.params.id
		author.save()

		return ctx.response.ok(author)
	}


	/**
    * @swagger
    * /authors/{id}:
    *   delete:
    *     summary: Delete Author Record Endpoint
    *     tags:
    *       - Authors
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: id of the requested Author record
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       200:
    *         description: Author record deleted successfully
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *                   example: 'Deleted Successfully'
    *       401:
    *         $ref: '#/components/responses/Unauthorized'
    *       404:
    *         $ref: '#/components/responses/NotFound'
    *       409:
    *         description: Removing an author with existing books records (foreign key constraint) which must be removed first
    *         content:
    *           application/json:
    *             schema:
    *               oneOf:
    *                 - type: object
    *                   properties:
    *                     message:
    *                       type: string
    *                       example: 'Attempting to remove an author with corresponding book records, remove books first'
    *       500:
    *         $ref: '#/components/responses/InternalServerError'
    */
	public async remove(ctx: HttpContextContract) {
		const author = await Author.find(ctx.params.id)

		if(author === null)
			throw new Exception(
				'Requested record not found',
		        404,
		        'E_NOT_FOUND'
			)

		try {
			await author.delete()
		} catch (throwable) {
			if(throwable.errno === 1451) {
				return ctx.response.conflict({message: 'Attempting to remove an author with corresponding book records, remove books first'})
			}

			throw throwable
		}
		
		return ctx.response.ok({message: 'Deleted Successfully'})
	}
}
