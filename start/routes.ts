/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { sep, normalize } from 'node:path'
import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')
const RemindersController = () => import('#controllers/reminders_controller')
const AuthController = () => import('#controllers/auth_controller')
const TodosController = () => import('#controllers/todos_controller')

const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/

router.post('/login', [AuthController, 'login'])
router.post('/register', [AuthController, 'register'])

// Upload routes
router.get('/uploads/avatar/*', async ({ request, response }) => {
  const filePath = request.param('*').join(sep)
  const normalizedPath = normalize(filePath)

  if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
    return response.badRequest('Malformed path')
  }

  const absolutePath = app.makePath('uploads/avatar', normalizedPath)
  return response.download(absolutePath)
})

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
    router.put('/users/me', [UsersController, 'update'])
  })
  .middleware(middleware.auth())
