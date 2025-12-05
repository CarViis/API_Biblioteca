import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Emprestimo extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare leitor_id: number

  @column()
  declare livro_id: number

  @column()
  declare data_emprestimo: Date

  @column()
  declare data_devolucao_esperada: Date

  @column()
  declare data_devolucao: Date | null

  @column()
  declare status: string // 'ativo' | 'devolvido' | 'atrasado'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
