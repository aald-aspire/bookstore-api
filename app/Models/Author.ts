import { column } from '@ioc:Adonis/Lucid/Orm'
import BaseModel from 'App/Models/BaseModel'

/**
* @swagger
* components:
*   schemas:
*      Author:
*        description: API representation of Author model
*        type: object
*        properties:
*          id:
*            type: string
*            readOnly: true
*          name:
*            type: string
*          biography:
*            type: string
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
export default class Author extends BaseModel {
  public static table = 'authors'

  @column()
  public name: string

  @column()
  public biography: string
}
