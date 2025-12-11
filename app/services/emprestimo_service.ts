import { DateTime } from 'luxon'
import Emprestimo from '#models/emprestimo'
import User from '#models/user'
import Livro from '#models/livro'
import Multa from '#models/multa'

export interface CreateLoanPayload {
  user_id: number
  book_id: number
  loan_date: Date
  expected_return_date?: Date
}

/**
 * Service for managing loan operations with business logic validation
 * Requirements:
 * - Check available book copies
 * - Check user has no pending delays
 * - Check user has no unpaid fines
 * - Maximum 3 simultaneous books per reader
 * - Default 14-day return date if not provided
 */
export default class EmprestimoService {
  private MAX_LOANS_PER_READER = 3
  private DEFAULT_LOAN_DAYS = 14

  /**
   * Create a new loan with comprehensive validation
   * @throws Error if validation fails
   */
  async createLoan(payload: CreateLoanPayload): Promise<Emprestimo> {
    // Validate user exists
    const user = await User.find(payload.user_id)
    if (!user) {
      throw new Error(`User with ID ${payload.user_id} not found`)
    }

    // Validate book exists
    const book = await Livro.find(payload.book_id)
    if (!book) {
      throw new Error(`Book with ID ${payload.book_id} not found`)
    }

    // Check 1: Book has available copies
    await this.checkAvailableCopies(payload.book_id)

    // Check 2: User has no pending delays
    await this.checkPendingDelays(payload.user_id)

    // Check 3: User has no unpaid fines
    await this.checkUnpaidFines(payload.user_id)

    // Check 4: User hasn't reached max simultaneous loans
    await this.checkMaxLoansLimit(payload.user_id)

    // Calculate expected return date if not provided
    const expectedReturnDate = payload.expected_return_date
      ? new Date(payload.expected_return_date)
      : DateTime.now().plus({ days: this.DEFAULT_LOAN_DAYS }).toJSDate()

    // Create loan
    const emprestimo = await Emprestimo.create({
      user_id: payload.user_id,
      book_id: payload.book_id,
      loan_date: new Date(payload.loan_date),
      expected_return_date: expectedReturnDate,
      status: 'active',
    })

    // Decrease book quantity
    await this.decreaseBookQuantity(payload.book_id)

    return emprestimo
  }

  /**
   * Check if book has available copies
   * @throws Error if no copies available
   */
  private async checkAvailableCopies(bookId: number): Promise<void> {
    const book = await Livro.find(bookId)
    if (!book || book.quantity_of_copies <= 0) {
      throw new Error(`Book (ID ${bookId}) has no available copies`)
    }
  }

  /**
   * Check if reader has pending delays (unreturned loans past due date)
   * @throws Error if reader has pending delays
   */
  private async checkPendingDelays(userId: number): Promise<void> {
    const today = new Date()

    const pendingLoans = await Emprestimo.query()
      .where('user_id', userId)
      .where('status', 'active')
      .where('expected_return_date', '<', today)
      .first()

    if (pendingLoans) {
      throw new Error(
        `User (ID ${userId}) has pending delays and cannot borrow more books`
      )
    }
  }

  /**
   * Check if reader has unpaid fines
   * @throws Error if reader has unpaid fines
   */
  private async checkUnpaidFines(userId: number): Promise<void> {
    const unpaidFine = await Multa.query()
      .where('user_id', userId)
      .where('status', 'pendente')
      .first()

    if (unpaidFine) {
      throw new Error(
        `User (ID ${userId}) has unpaid fines and cannot borrow more books`
      )
    }
  }

  /**
   * Check if reader has reached max simultaneous loans (max 3)
   * @throws Error if reader has reached limit
   */
  private async checkMaxLoansLimit(userId: number): Promise<void> {
    const activeLoansCount = await Emprestimo.query()
      .where('user_id', userId)
      .where('status', 'active')
      .count('*')

    const count = activeLoansCount[0].$extras.count

    if (count >= this.MAX_LOANS_PER_READER) {
      throw new Error(
        `User (ID ${userId}) has reached the maximum of ${this.MAX_LOANS_PER_READER} simultaneous loans`
      )
    }
  }

  /**
   * Decrease book quantity when a loan is created
   */
  private async decreaseBookQuantity(bookId: number): Promise<void> {
    const book = await Livro.find(bookId)
    if (book) {
      book.quantity_of_copies = book.quantity_of_copies - 1
      await book.save()
    }
  }

  /**
   * Increase book quantity when a loan is returned
   */
  async returnLoan(loanId: number, returnDate: Date): Promise<Emprestimo> {
    const emprestimo = await Emprestimo.findOrFail(loanId)

    // Increase book quantity
    const book = await Livro.find(emprestimo.book_id)
    if (book) {
      book.quantity_of_copies = book.quantity_of_copies + 1
      await book.save()
    }

    // Update loan status
    emprestimo.actual_return_date = returnDate
    emprestimo.status = 'returned'
    await emprestimo.save()

    return emprestimo
  }
}