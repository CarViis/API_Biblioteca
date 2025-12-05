import Emprestimo from '#models/emprestimo'
import type { HttpContext } from '@adonisjs/core/http'
import { createEmprestimoValidator, updateEmprestimoValidator } from '#validators/emprestimo'

export default class EmprestimosController {
  /**
   * Display a list of loans
   * GET /loans
   */
  async index({}: HttpContext) {
    const emprestimos = await Emprestimo.all()
    return emprestimos
  }

  /**
   * Create a new loan
   * POST /loans
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createEmprestimoValidator)
    const emprestimo = await Emprestimo.create(payload)
    return emprestimo
  }

  /**
   * Show a specific loan
   * GET /loans/:id
   */
  async show({ params }: HttpContext) {
    const emprestimo = await Emprestimo.findOrFail(params.id)
    return emprestimo
  }

  /**
   * Return a loan
   * PUT /loans/:id/return
   */
  async retornar({ params, request }: HttpContext) {
    const emprestimo = await Emprestimo.findOrFail(params.id)
    const payload = await request.validateUsing(updateEmprestimoValidator)
    
    await emprestimo.merge({
      data_devolucao: payload.data_devolucao,
      status: 'devolvido'
    }).save()

    return emprestimo
  }
}
