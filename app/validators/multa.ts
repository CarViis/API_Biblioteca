import vine from '@vinejs/vine'

/**
 * Validates the payment of a fine
 */
export const updateMultaValidator = vine.compile(
  vine.object({
    data_pagamento: vine.date(),
  })
)
