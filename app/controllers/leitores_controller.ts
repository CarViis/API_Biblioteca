import type { HttpContext } from '@adonisjs/core/http'
import Leitor from '#models/leitore'
import { createLeitoresValidator, updateLeitoresValidator } from '#validators/leitore'

export default class LeitoresController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const leitores = await Leitor.all()
    return leitores
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createLeitoresValidator)
    const leitores = await Leitor.create(payload)
    return leitores
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
    const payload = await request.validateUsing(updateLeitoresValidator)
    return payload
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const leitores = await Leitor.findOrFail(params.id)
    await leitores.delete()
    return leitores
  }
}
