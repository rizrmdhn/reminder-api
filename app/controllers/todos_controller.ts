import Todo from '#models/todo'
import type { HttpContext } from '@adonisjs/core/http'

export default class TodosController {
  /**
   * Display a list of resource
   */
  async index({ auth, response }: HttpContext) {
    const user = await auth.use('jwt').authenticate()

    const todos = await Todo.query().where('created_by', user.user_id)

    return response.ok({
      meta: {
        status: 200,
        message: 'Success',
      },
      data: todos,
    })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
