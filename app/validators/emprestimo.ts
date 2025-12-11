import vine from '@vinejs/vine'

/**
 * Validates the creation of a loan
 */
export const createEmprestimoValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    book_id: vine.number(),
    loan_date: vine.date(),
    expected_return_date: vine.date().optional(),
  })
)

/**
 * Validates the return of a loan
 */
export const updateEmprestimoValidator = vine.compile(
  vine.object({
    actual_return_date: vine.date(),
  })
)
