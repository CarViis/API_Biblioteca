import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Multa extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare emprestimo_id: number

  @column()
  declare leitor_id: number

  @column()
  declare valor: number

  @column()
  declare data_multa: Date

  @column()
  declare data_pagamento: Date | null

  @column()
  declare status: string // 'pendente' | 'pago'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
