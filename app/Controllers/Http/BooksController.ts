import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@poppinss/utils'
import Book from 'App/Models/Book'

export default class BooksController {

	/**
    * @swagger
    * /books/:
    *   get:
    *     summary: Lists available Book records
    *     tags:
    *       - Books
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       200:
    *         description: List of Book Records
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 $ref: '#/components/schemas/Book'
    *       204:
    *         $ref: '#/components/responses/NoContent'
    *       401:
    *         $ref: '#/components/responses/Unauthorized'
    *       500:
    *         $ref: '#/components/responses/InternalServerError'
    */
	public async index(ctx: HttpContextContract) {
		try {
			const books = await Book.all()
			return books
		} catch (throwable) {
			// console.log(throwable)
			return ctx.response.internalServerError({message: 'Unknown Server Error'})
		}
	}


	/**
    * @swagger
    * /books/{id}:
    *   get:
    *     summary: Get a Book record by ID
    *     tags:
    *       - Books
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: id of the requested Book record
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       200:
    *         description: The Requested Book Record
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Book'
    *       401:
    *         $ref: '#/components/responses/Unauthorized'
    *       404:
    *         $ref: '#/components/responses/NotFound'
    *       500:
    *         $ref: '#/components/responses/InternalServerError'
    */
	public async show(ctx: HttpContextContract) {
		
		const book = await Book.find(ctx.params.id)

		if(book === null)
			throw new Exception(
				'Requested record not found',
		        404,
		        'E_NOT_FOUND'
			)

		return book
	}


	/**
    * @swagger
    * /books/:
    *   post:
    *     summary: Add New Book Endpoint
    *     tags:
    *       - Books
    *     requestBody:
    *       description: Book Payload
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Book'
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       201:
    *         description: Book created successfully
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Book'
    *       401:
    *         $ref: '#/components/responses/Unauthorized'
    *       409:
    *         description: Book Already Exists
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Book'
    *       500:
    *         $ref: '#/components/responses/InternalServerError'
    */
	public async add(ctx: HttpContextContract) {
		const bookInfo = await ctx.request.body()

		try {
			const book = await Book.create({
				title: bookInfo.title,
				author: bookInfo.author,
				isbn: bookInfo.isbn,
				description: bookInfo.description,
				price: bookInfo.price,
				quantity: bookInfo.quantity,
                created_by: ctx.auth.user.id
			});

			return ctx.response.created(book)
		} catch(throwable) {
			// console.log(throwable)

			if(throwable.errno === 1062)
				return ctx.response.conflict({message: 'Book Already Exists'})

			throw throwable
		}
	}


	/**
    * @swagger
    * /books/{id}:
    *   put:
    *     summary: Modify An Existing Book Record Endpoint
    *     tags:
    *       - Books
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: id of the requested Book record
    *     requestBody:
    *       description: Book Payload
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Book'
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       200:
    *         description: Book record updated successfully
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Book'
    *       401:
    *         $ref: '#/components/responses/Unauthorized'
    *       404:
    *         $ref: '#/components/responses/NotFound'
    *       500:
    *         $ref: '#/components/responses/InternalServerError'
    */
	public async edit(ctx: HttpContextContract) {
		const bookInfo = ctx.request.body()
		const book = await Book.find(ctx.params.id)

		if(book === null)
			throw new Exception(
				'Requested record not found',
		        404,
		        'E_NOT_FOUND'
			)

		book.merge(bookInfo)
		book.save()

		return ctx.response.ok(book)
	}


	/**
    * @swagger
    * /book/{id}:
    *   delete:
    *     summary: Delete Book Record Endpoint
    *     tags:
    *       - Books
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: id of the requested Book record
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       200:
    *         description: Book record deleted successfully
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
    *       500:
    *         $ref: '#/components/responses/InternalServerError'
    */
	public async remove(ctx: HttpContextContract) {
		const book = await Book.find(ctx.params.id)

		if(book === null)
			throw new Exception(
				'Requested record not found',
		        404,
		        'E_NOT_FOUND'
			)

		await book.delete()
		return ctx.response.ok({message: 'Deleted Successfully'})
	}
}
