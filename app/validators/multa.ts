import vine from '@vinejs/vine'

/**
 * Validates the payment of a fine
 */
export const updateMultaValidator = vine.compile(
  vine.object({
    payment_date: vine.date(),
  })
)
