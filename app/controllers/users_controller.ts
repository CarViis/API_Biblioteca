import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { createUsersValidator, updateUsersValidator } from '#validators/user'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const Usuarios = await User.all()
    return Usuarios
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createUsersValidator)
    const Usuario = await User.create(payload)
    return Usuario
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
    const payload = await request.validateUsing(updateUsersValidator)
    return payload
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const Usuario = await User.findOrFail(params.id)
    await Usuario.delete()
    return Usuario
  }
}
