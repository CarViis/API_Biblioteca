import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'multas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('emprestimo_id').unsigned().notNullable().references('id').inTable('emprestimos').onDelete('CASCADE')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.decimal('amount', 8, 2).notNullable()
      table.date('fine_date').notNullable()
      table.date('payment_date').nullable()
      table.enum('status', ['pendente', 'pago']).defaultTo('pendente')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
