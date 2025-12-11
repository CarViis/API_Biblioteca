import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Livro extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare author: string

  @column()
  declare publisher: string

  @column()
  declare isbn: string

  @column()
  declare publication_date: Date

  @column()
  declare edition: string

  @column()
  declare number_of_pages: number

  @column()
  declare category: string

  @column()
  declare quantity_of_copies: number

  @column()
  declare shelf_location: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
