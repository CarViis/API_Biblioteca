import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const createLivrosValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    author: vine.string().trim(),
    publisher: vine.string().trim(),
    isbn: vine.string().trim(),
    publication_date: vine.date(),
    edition: vine.string().trim(),
    number_of_pages: vine.number(),
    category: vine.string().trim(),
    quantity_of_copies: vine.number(),
    shelf_location: vine.string().trim(),
    description: vine.string().trim().escape()
  })
)

/**
 * Validates the post's update action
 */
export const updateLivroValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    author: vine.string().trim(),
    publisher: vine.string().trim(),
    isbn: vine.string().trim(),
    publication_date: vine.date(),
    edition: vine.string().trim(),
    number_of_pages: vine.number(),
    category: vine.string().trim(),
    quantity_of_copies: vine.number(),
    shelf_location: vine.string().trim(),
    description: vine.string().trim().escape()
  })
)
