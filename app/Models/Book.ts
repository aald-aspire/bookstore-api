import { column } from '@ioc:Adonis/Lucid/Orm'
import BaseModel from 'App/Models/BaseModel'

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
