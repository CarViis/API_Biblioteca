import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Livro from './livro.js'

export default class Emprestimo extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare book_id: number

  @column()
  declare loan_date: Date

  @column()
  declare expected_return_date: Date

  @column()
  declare actual_return_date: Date | null

  @column()
  declare status: string // 'active' | 'returned' | 'overdue'

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Livro, {
    foreignKey: 'book_id',
  })
  declare livro: BelongsTo<typeof Livro>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
