import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Multa extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare emprestimo_id: number

  @column()
  declare user_id: number

  @column()
  declare amount: number

  @column()
  declare fine_date: Date

  @column()
  declare payment_date: Date | null

  @column()
  declare status: string // 'pendente' | 'pago'

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
