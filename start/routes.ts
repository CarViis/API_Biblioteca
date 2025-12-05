/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/users_controller'
import LivrosController from '#controllers/livros_controller'
import EmprestimosController from '#controllers/emprestimos_controller'
import MultasController from '#controllers/multas_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

/**
 * ============================================================================
 * USERS - GET, POST /users — GET, PUT, DELETE /users/:id
 * ============================================================================
 */
router.group(() => {
  router.get('/', [UsersController, 'index']) // GET /users
  router.post('/', [UsersController, 'store']) // POST /users
  router.post('/create-typed', [UsersController, 'createTyped']) // POST /users/create-typed
  router.get('/:id', [UsersController, 'show']) // GET /users/:id
  router.put('/:id', [UsersController, 'update']) // PUT /users/:id
  router.delete('/:id', [UsersController, 'destroy']) // DELETE /users/:id
}).prefix('/users')

/**
 * ============================================================================
 * BOOKS - GET, POST /books — GET, PUT, DELETE /books/:id — GET /books/search
 * ============================================================================
 */
router.group(() => {
  router.get('/', [LivrosController, 'index']) // GET /books
  router.post('/', [LivrosController, 'store']) // POST /books
  router.get('/search', [LivrosController, 'search']) // GET /books/search?q=termo
  router.get('/:id', [LivrosController, 'show']) // GET /books/:id
  router.put('/:id', [LivrosController, 'update']) // PUT /books/:id
  router.delete('/:id', [LivrosController, 'destroy']) // DELETE /books/:id
}).prefix('/books')

/**
 * ============================================================================
 * LOANS - GET, POST /loans — GET /loans/:id — PUT /loans/:id/return
 * ============================================================================
 */
router.group(() => {
  router.get('/', [EmprestimosController, 'index']) // GET /loans
  router.post('/', [EmprestimosController, 'store']) // POST /loans
  router.get('/:id', [EmprestimosController, 'show']) // GET /loans/:id
  router.put('/:id/return', [EmprestimosController, 'retornar']) // PUT /loans/:id/return
}).prefix('/loans')

/**
 * ============================================================================
 * FINES - GET /fines — PUT /fines/:id/pay
 * ============================================================================
 */
router.group(() => {
  router.get('/', [MultasController, 'index']) // GET /fines
  router.put('/:id/pay', [MultasController, 'pagar']) // PUT /fines/:id/pay
}).prefix('/fines')
