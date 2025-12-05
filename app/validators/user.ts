import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const createUsersValidator = vine.compile(
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
 * Validates the creation of a specific user type with optional type parameter
 */
export const createUserWithTypeValidator = vine.compile(
  vine.object({
    type: vine.enum(['user', 'leitor', 'administrador', 'bibliotecario']).optional(),
    nome: vine.string().trim().minLength(6),
    CPF: vine.string().trim(),
    email: vine.string().trim().email(),
    telefone: vine.string().trim(),
    endereco: vine.string().trim(),
    data_de_cadastro: vine.date(),
    password: vine.string().trim().minLength(6).optional(),
    matricula: vine.string().trim().optional(), // Obrigatório para leitor
  })
)

/**
 *
 * Validates the post's update action
 */
export const updateUsersValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(6),
    CPF: vine.string().trim(),
    email: vine.string().trim().email(),
    telefone: vine.string().trim(),
    endereco: vine.string().trim(),
    data_de_cadastro: vine.date()
  })
)
