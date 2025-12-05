import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const createLivrosValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    ISBN: vine.string().trim(),
    editora: vine.string().trim(),
    autores: vine.string().trim(),
    ano_de_publicacao: vine.date(),
    edicao: vine.string().trim(),
    numero_de_paginas: vine.number(),
    categoria: vine.string().trim(),
    quantidade_de_exemplares: vine.number(),
    localização_na_estante: vine.string().trim(),
    description: vine.string().trim().escape()
  })
)

/**
 * Validates the post's update action
 */
export const updateLivroValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    ISBN: vine.string().trim(),
    editora: vine.string().trim(),
    autores: vine.string().trim(),
    ano_de_publicacao: vine.date(),
    edicao: vine.string().trim(),
    numero_de_paginas: vine.number(),
    categoria: vine.string().trim(),
    quantidade_de_exemplares: vine.number(),
    localização_na_estante: vine.string().trim(),
    description: vine.string().trim().escape()
  })
)
