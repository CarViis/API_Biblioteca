import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'livros'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 255).notNullable()
      table.string('author', 255).notNullable()
      table.string('publisher', 255).notNullable()
      table.string('isbn', 20).notNullable().unique()
      table.date('publication_date').notNullable()
      table.string('edition', 100).notNullable()
      table.integer('number_of_pages').notNullable()
      table.string('category', 100).notNullable()
      table.integer('quantity_of_copies').notNullable()
      table.string('shelf_location', 100).notNullable()
      table.text('description').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
