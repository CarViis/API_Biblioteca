import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const createLeitoresValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    matricula: vine.string().trim(),
    course: vine.string().trim()
  })
)

/**
 * Validates the post's update action
 */
export const updateLeitoresValidator = vine.compile(
  vine.object({
    matricula: vine.string().trim(),
    course: vine.string().trim()
  })
)
