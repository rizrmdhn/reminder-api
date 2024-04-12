/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')
const RemindersController = () => import('#controllers/reminders_controller')
const AuthController = () => import('#controllers/auth_controller')
const TodosController = () => import('#controllers/todos_controller')

router.post('/login', [AuthController, 'login'])
router.post('/register', [AuthController, 'register'])

router
  .group(() => {
    // Todo routes
    router.get('/todos', [TodosController, 'index'])
    router.post('/todos', [TodosController, 'store'])
    router.get('/todos/:todo_id', [TodosController, 'show'])
    router.put('/todos/:todo_id', [TodosController, 'edit'])
    router.delete('/todos/:todo_id', [TodosController, 'destroy'])

    // Reminder routes
    router.get('/reminders', [RemindersController, 'index'])
    router.post('/reminders', [RemindersController, 'store'])
    router.get('/reminders/:reminder_id', [RemindersController, 'show'])
    router.put('/reminders/:reminder_id', [RemindersController, 'edit'])
    router.delete('/reminders/:reminder_id', [RemindersController, 'destroy'])

    // User routes
    router.get('/users/me', [UsersController, 'index'])
  })
  .middleware(middleware.auth())
