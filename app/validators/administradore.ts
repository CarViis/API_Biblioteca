import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const createAdministradoresValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(6),
    CPF: vine.string().trim(),
    email: vine.string().trim().email(),
    telefone: vine.string().trim(),
    endereco: vine.string().trim(),
    data_de_cadastro: vine.date()
  })
)

/**
 * Validates the post's update action
 */
export const updateAdministradoresValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(6),
    CPF: vine.string().trim(),
    email: vine.string().trim().email(),
    telefone: vine.string().trim(),
    endereco: vine.string().trim(),
    data_de_cadastro: vine.date()
  })
)
