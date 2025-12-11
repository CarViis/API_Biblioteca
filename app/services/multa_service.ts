import Multa from '#models/multa'
import Emprestimo from '#models/emprestimo'

/**
 * Service for managing fines (multas)
 * Automatically calculates and creates fines for overdue book returns
 */
export default class MultaService {
  /**
   * Configurable daily fine amount (in currency units)
   * Can be overridden per call if needed
   */
  private DEFAULT_DAILY_FINE = 5.0

  /**
   * Calculate and create fine if loan is overdue
   * @param emprestimoId - Loan ID to process
   * @param actualReturnDate - Date when book was actually returned
   * @param dailyFineAmount - Optional daily fine rate (default: 5.0)
   * @returns Created fine or null if not overdue
   * @throws Error if loan not found
   */
  async processReturnAndCreateFine(
    emprestimoId: number,
    actualReturnDate: Date,
    dailyFineAmount: number = this.DEFAULT_DAILY_FINE
  ): Promise<Multa | null> {
    // Get the loan
    const emprestimo = await Emprestimo.findOrFail(emprestimoId)

    // Calculate days overdue
    const daysOverdue = this.calculateDaysOverdue(
      new Date(emprestimo.expected_return_date),
      new Date(actualReturnDate)
    )

    // If not overdue, no fine needed
    if (daysOverdue <= 0) {
      return null
    }

    // Calculate fine amount
    const fineAmount = daysOverdue * dailyFineAmount

    // Create fine record
    const multa = await Multa.create({
      emprestimo_id: emprestimoId,
      user_id: emprestimo.user_id,
      amount: fineAmount,
      fine_date: new Date(),
      status: 'pendente',
    })

    return multa
  }

  /**
   * Calculate days overdue between expected and actual return dates
   * @param expectedDate - Expected return date
   * @param actualDate - Actual return date
   * @returns Number of days overdue (0 or negative if not overdue)
   */
  private calculateDaysOverdue(expectedDate: Date, actualDate: Date): number {
    const expectedTime = new Date(expectedDate).getTime()
    const actualTime = new Date(actualDate).getTime()
    const diffTime = actualTime - expectedTime
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  /**
   * Mark a fine as paid
   * @param multaId - Fine ID
   * @param paymentDate - Date of payment
   * @returns Updated fine
   * @throws Error if fine not found
   */
  async markAsPaid(multaId: number, paymentDate: Date = new Date()): Promise<Multa> {
    const multa = await Multa.findOrFail(multaId)
    multa.payment_date = paymentDate
    multa.status = 'pago'
    await multa.save()
    return multa
  }

  /**
   * Get all pending fines for a user
   * @param userId - User ID
   * @returns Array of pending fines
   */
  async getPendingFinesByUser(userId: number): Promise<Multa[]> {
    return Multa.query().where('user_id', userId).where('status', 'pendente')
  }

  /**
   * Get total amount owed by user in pending fines
   * @param userId - User ID
   * @returns Total fine amount
   */
  async getTotalOwedByUser(userId: number): Promise<number> {
    const fines = await Multa.query()
      .where('user_id', userId)
      .where('status', 'pendente')
      .select('amount')

    return fines.reduce((total, fine) => total + fine.amount, 0)
  }
}
