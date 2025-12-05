import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Livro extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare ISBN: string

  @column()
  declare editora: string

  @column()
  declare autores: string

  @column()
  declare ano_de_publicacao: Date

  @column()
  declare edicao: string

  @column()
  declare numero_de_paginas: number

  @column()
  declare categoria: string

  @column()
  declare quantidade_de_exemplares: number

  @column()
  declare localização_na_estante: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
