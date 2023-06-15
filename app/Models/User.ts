import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import BaseModel from 'App/Models/BaseModel'

export default class User extends BaseModel {
  public static table = 'users'

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public role: string

  @column()
  public rememberMeToken: string | null

  @beforeSave()
  public static async checkFields (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }

    user.role = user.role.toLowerCase()
  }
}
