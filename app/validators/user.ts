import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const createUsersValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(6),
    cpf: vine.string().trim(),
    email: vine.string().trim().email(),
    phone: vine.string().trim(),
    address: vine.string().trim(),
    registration_date: vine.date(),
    password: vine.string().trim().minLength(6)
  })
)

/**
 * Validates the creation of a specific user type with optional type parameter
 */
export const createUserWithTypeValidator = vine.compile(
  vine.object({
    type: vine.enum(['user', 'leitor', 'administrador', 'bibliotecario']).optional(),
    name: vine.string().trim().minLength(6),
    cpf: vine.string().trim(),
    email: vine.string().trim().email(),
    phone: vine.string().trim(),
    address: vine.string().trim(),
    registration_date: vine.date(),
    password: vine.string().trim().minLength(6),
    matricula: vine.string().trim().optional(),
  })
)

/**
 *
 * Validates the post's update action
 */
export const updateUsersValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(6),
    cpf: vine.string().trim(),
    email: vine.string().trim().email(),
    phone: vine.string().trim(),
    address: vine.string().trim(),
    registration_date: vine.date()
  })
)
