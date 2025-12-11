import User from '#models/user'
import Leitor from '#models/leitor'
import Administradore from '#models/administradore'
import Bibliotecario from '#models/bibliotecario'

export type UserType = 'user' | 'leitor' | 'administrador' | 'bibliotecario'

export interface CreateUserPayload {
  name: string
  email: string
  cpf: string
  phone: string
  address: string
  registration_date: Date
  password?: string
}

export interface CreateLeitorPayload extends CreateUserPayload {
  matricula: string
}

/**
 * Serviço responsável por criar diferentes tipos de usuários
 * Documentação Lucid ORM: https://lucid.adonisjs.com/docs
 */
export default class UserCreationService {
  /**
   * Cria um novo usuário baseado no tipo especificado
   * @param type - Tipo de usuário: 'user', 'leitor', 'administrador', 'bibliotecario'
   * @param payload - Dados do usuário
   * @returns Usuario criado com seus dados
   */
  async createUser(type: UserType, payload: CreateUserPayload | CreateLeitorPayload) {
    switch (type) {
      case 'leitor':
        return this.createLeitor(payload as CreateLeitorPayload)

      case 'administrador':
        return this.createAdministrador(payload)

      case 'bibliotecario':
        return this.createBibliotecario(payload)

      case 'user':
      default:
        return this.createBasicUser(payload)
    }
  }

  /**
   * Cria um usuário básico (User)
   */
  private async createBasicUser(payload: CreateUserPayload) {
    const user = await User.create({
      name: payload.name,
      email: payload.email,
      cpf: payload.cpf,
      phone: payload.phone,
      address: payload.address,
      registration_date: payload.registration_date,
      password: payload.password || 'senha_temporaria',
    })

    return {
      type: 'user',
      user,
    }
  }

  /**
   * Cria um Leitor (Reader) com User associado
   */
  private async createLeitor(payload: CreateLeitorPayload) {
    // Cria o usuário base
    const user = await User.create({
      name: payload.name,
      email: payload.email,
      cpf: payload.cpf,
      phone: payload.phone,
      address: payload.address,
      registration_date: payload.registration_date,
      password: payload.password || 'senha_temporaria',
    })

    // Cria o leitor associado
    const leitor = await Leitor.create({
      userId: user.id,
      matricula: payload.matricula,
    })

    return {
      type: 'leitor',
      user,
      leitor,
    }
  }

  /**
   * Cria um Administrador
   */
  private async createAdministrador(payload: CreateUserPayload) {
    const administrador = await Administradore.create({
      name: payload.name,
      email: payload.email,
      cpf: payload.cpf,
      phone: payload.phone,
      address: payload.address,
      registration_date: payload.registration_date,
    })

    return {
      type: 'administrador',
      administrador,
    }
  }

  /**
   * Cria um Bibliotecário
   */
  private async createBibliotecario(payload: CreateUserPayload) {
    const bibliotecario = await Bibliotecario.create({
      name: payload.name,
      email: payload.email,
      cpf: payload.cpf,
      phone: payload.phone,
      address: payload.address,
      registration_date: payload.registration_date,
    })

    return {
      type: 'bibliotecario',
      bibliotecario,
    }
  }
}
