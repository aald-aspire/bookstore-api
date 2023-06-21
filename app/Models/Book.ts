import { column } from '@ioc:Adonis/Lucid/Orm'
import BaseModel from 'App/Models/BaseModel'

/**
* @swagger
* components:
*   schemas:
*      Book:
*        description: API representation of Book model
*        type: object
*        properties:
*          id:
*            type: string
*            readOnly: true
*          title:
*            type: string
*          author:
*            type: string
*          isbn:
*            type: string
*          description:
*            type: string
*          price:
*            type: number
*            format: double
*          quantity:
*            type: integer
*          created_at:
*            type: string
*            format: date-time
*            readOnly: true
*          updated_at:
*            type: string
*            format: date-time
*            readOnly: true
* 
*/
export default class Book extends BaseModel {
  public static table = 'books'

  @column()
  public title: string

  @column()
  public author: string

  @column()
  public isbn: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public quantity: number
}
