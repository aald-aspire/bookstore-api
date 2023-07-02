import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().unique()
      table.string('title').notNullable().unique()
      table.uuid('author').references('id').inTable('authors')
      table.string('isbn').notNullable().unique()
      table.text('description', 'medium_text').notNullable()
      table.decimal('price').notNullable().defaultTo(0.0)
      table.integer('quantity').notNullable().defaultTo(0)
      table.uuid('created_by').references('id').inTable('users').onDelete('SET NULL')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
