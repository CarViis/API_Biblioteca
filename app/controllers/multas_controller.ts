import Multa from '#models/multa'
import type { HttpContext } from '@adonisjs/core/http'
import { updateMultaValidator } from '#validators/multa'

export default class MultasController {
  /**
   * Display a list of fines
   * GET /fines
   */
  async index({}: HttpContext) {
    const multas = await Multa.all()
    return multas
  }

  /**
   * Pay a fine
   * PUT /fines/:id/pay
   */
  async pagar({ params, request }: HttpContext) {
    const multa = await Multa.findOrFail(params.id)
    const payload = await request.validateUsing(updateMultaValidator)

    await multa.merge({
      payment_date: payload.payment_date,
      status: 'pago'
    }).save()

    return multa
  }
}
