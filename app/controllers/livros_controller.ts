import type { HttpContext } from '@adonisjs/core/http'
import Livro from '#models/livro'
import { createLivrosValidator, updateLivroValidator } from '#validators/livro'

export default class LivrosController {
  /**
   * Display a list of books
   * GET /books
   */
  async index({}: HttpContext) {
    const livros = await Livro.all()
    return livros
  }

  /**
   * Create a new book
   * POST /books
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createLivrosValidator)
    const livro = await Livro.create(payload)
    return livro
  }

  /**
   * Show a specific book
   * GET /books/:id
   */
  async show({ params }: HttpContext) {
    const livro = await Livro.findOrFail(params.id)
    return livro
  }

  /**
   * Update a book
   * PUT /books/:id
   */
  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(updateLivroValidator)
    const livro = await Livro.findOrFail(params.id)
    await livro.merge(payload).save()
    return livro
  }

  /**
   * Delete a book
   * DELETE /books/:id
   */
  async destroy({ params }: HttpContext) {
    const livro = await Livro.findOrFail(params.id)
    await livro.delete()
    return livro
  }

  /**
   * Search books
   * GET /books/search?q=termo
   */
  async search({ request }: HttpContext) {
    const query = request.input('q', '')
    if (!query) {
      return { error: 'Query parameter "q" is required' }
    }

    const livros = await Livro.query()
      .where('titulo', 'like', `%${query}%`)
      .orWhere('autor', 'like', `%${query}%`)
      .orWhere('ISBN', 'like', `%${query}%`)

    return livros
  }
}
