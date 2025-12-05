import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'livros'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('titulo', 255).notNullable()
      table.string('autor', 255).notNullable()
      table.string('editora', 255).notNullable()
      table.string('ISBN', 20).notNullable().unique()
      table.date('data_de_publicacao').notNullable()
      table.integer('numero_de_paginas').notNullable()
      table.string('categoria', 100).notNullable()
      table.integer('quantidade_de_exemplares').notNullable()
      table.string('localizacao_na_estante', 100).notNullable()
      table.text('descricao').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
