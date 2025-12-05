import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { createUsersValidator, updateUsersValidator, createUserWithTypeValidator } from '#validators/user'
import UserCreationService, { type UserType } from '#services/user_creation_service'

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
   * Cria um usuário básico sem tipo específico
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createUsersValidator)
    const service = new UserCreationService()
    const result = await service.createUser('user', payload)
    return result
  }

  /**
   * Create a specific user type (leitor, administrador, bibliotecario)
   * POST /users/create-typed
   * Body: {
   *   type: 'leitor' | 'administrador' | 'bibliotecario',
   *   nome, email, CPF, telefone, endereco, data_de_cadastro,
   *   matricula (obrigatório para leitor),
   *   password (opcional)
   * }
   */
  async createTyped({ request }: HttpContext) {
    const payload = await request.validateUsing(createUserWithTypeValidator)
    const userType: UserType = payload.type || 'user'
    
    // Validação específica para Leitor
    if (userType === 'leitor' && !payload.matricula) {
      return {
        error: 'matricula é obrigatória para usuários do tipo leitor',
        code: 'MISSING_MATRICULA'
      }
    }

    const service = new UserCreationService()
    const result = await service.createUser(userType, payload)
    return result
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const usuario = await User.findOrFail(params.id)
    return usuario
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(updateUsersValidator)
    const usuario = await User.findOrFail(params.id)
    await usuario.merge(payload).save()
    return usuario
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
