import User from '#models/user'
import Leitor from '#models/leitor'
import Administradore from '#models/administradore'
import Bibliotecario from '#models/bibliotecario'

export type UserType = 'user' | 'leitor' | 'administrador' | 'bibliotecario'

export interface CreateUserPayload {
  nome: string
  email: string
  CPF: string
  telefone: string
  endereco: string
  data_de_cadastro: Date
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
      nome: payload.nome,
      email: payload.email,
      CPF: payload.CPF,
      telefone: payload.telefone,
      endereco: payload.endereco,
      data_de_cadastro: payload.data_de_cadastro,
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
      nome: payload.nome,
      email: payload.email,
      CPF: payload.CPF,
      telefone: payload.telefone,
      endereco: payload.endereco,
      data_de_cadastro: payload.data_de_cadastro,
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
      nome: payload.nome,
      email: payload.email,
      CPF: payload.CPF,
      telefone: payload.telefone,
      endereco: payload.endereco,
      data_de_cadastro: payload.data_de_cadastro,
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
      nome: payload.nome,
      email: payload.email,
      CPF: payload.CPF,
      telefone: payload.telefone,
      endereco: payload.endereco,
      data_de_cadastro: payload.data_de_cadastro,
    })

    return {
      type: 'bibliotecario',
      bibliotecario,
    }
  }
}
