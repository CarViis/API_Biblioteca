import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'multas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('emprestimo_id').unsigned().notNullable().references('id').inTable('emprestimos').onDelete('CASCADE')
      table.integer('leitor_id').unsigned().notNullable().references('id').inTable('leitors').onDelete('CASCADE')
      table.decimal('valor', 8, 2).notNullable()
      table.date('data_multa').notNullable()
      table.date('data_pagamento').nullable()
      table.enum('status', ['pendente', 'pago']).defaultTo('pendente')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
