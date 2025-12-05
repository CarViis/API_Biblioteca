import Bibliotecario from '#models/bibliotecario'
import type { HttpContext } from '@adonisjs/core/http'
import {
  createBibliotecariosValidator,
  updateBibliotecariosValidator,
} from '#validators/bibliotecario'

export default class BibliotecariosController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const bibliotecarios = await Bibliotecario.all()
    return bibliotecarios
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createBibliotecariosValidator)
    const bibliotecario = await Bibliotecario.create(payload)
    return bibliotecario
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
    const payload = await request.validateUsing(updateBibliotecariosValidator)
    return payload
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const bibliotecario = await Bibliotecario.findOrFail(params.id)
    await bibliotecario.delete()
    return bibliotecario
  }
}
