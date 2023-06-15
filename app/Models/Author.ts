import { column } from '@ioc:Adonis/Lucid/Orm'
import BaseModel from 'App/Models/BaseModel'

export default class Author extends BaseModel {
  public static table = 'authors'

  @column()
  public name: string

  @column()
  public biography: string
}
