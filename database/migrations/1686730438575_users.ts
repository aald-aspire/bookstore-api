import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().unique()
      table.string('name').notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('role').notNullable().defaultTo('user')
      table.string('remember_me_token').nullable()
      table.uuid('created_by').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
