import { DateTime } from 'luxon'
import { column, beforeCreate, BaseModel as LucidBaseModel } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

export default class BaseModel extends LucidBaseModel {
  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true /*, autoUpdate: false*/})
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid (baseModel: BaseModel) {
    baseModel.id = uuidv4();
  }
}
