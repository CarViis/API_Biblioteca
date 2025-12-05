import vine from '@vinejs/vine'

/**
 * Validates the creation of a loan
 */
export const createEmprestimoValidator = vine.compile(
  vine.object({
    leitor_id: vine.number(),
    livro_id: vine.number(),
    data_emprestimo: vine.date(),
    data_devolucao_esperada: vine.date(),
  })
)

/**
 * Validates the return of a loan
 */
export const updateEmprestimoValidator = vine.compile(
  vine.object({
    data_devolucao: vine.date(),
  })
)
