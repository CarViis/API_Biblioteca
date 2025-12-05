import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'emprestimos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('leitor_id').unsigned().notNullable().references('id').inTable('leitors').onDelete('CASCADE')
      table.integer('livro_id').unsigned().notNullable().references('id').inTable('livros').onDelete('CASCADE')
      table.date('data_emprestimo').notNullable()
      table.date('data_devolucao_esperada').notNullable()
      table.date('data_devolucao').nullable()
      table.enum('status', ['ativo', 'devolvido', 'atrasado']).defaultTo('ativo')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
