import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'emprestimos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('book_id').unsigned().notNullable().references('id').inTable('livros').onDelete('CASCADE')
      table.date('loan_date').notNullable()
      table.date('expected_return_date').notNullable()
      table.date('actual_return_date').nullable()
      table.enum('status', ['active', 'returned', 'overdue']).defaultTo('active')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
