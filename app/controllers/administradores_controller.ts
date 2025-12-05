import type { HttpContext } from '@adonisjs/core/http'
import Administrador from '#models/administradore'
import {
  createAdministradoresValidator,
  updateAdministradoresValidator,
} from '#validators/administradore'

export default class AdministradoresController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const administradores = await Administrador.all()
    return administradores
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createAdministradoresValidator)
    const administrador = await Administrador.create(payload)
    return administrador
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
    const payload = await request.validateUsing(updateAdministradoresValidator)
    return payload
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const administrador = await Administrador.findOrFail(params.id)
    await administrador.delete()
    return administrador
  }
}
