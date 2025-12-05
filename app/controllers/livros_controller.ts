import type { HttpContext } from '@adonisjs/core/http'
import Livro from '#models/livro'
import { createLivrosValidator, updateLivroValidator } from '#validators/livro'

export default class LivrosController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const livros = await Livro.all()
    return livros
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createLivrosValidator)
    const livros = await Livro.create(payload)
    return livros
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(updateLivroValidator)
    return payload
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const livros = await Livro.findOrFail(params.id)
    await livros.delete()
    return livros
  }
}
