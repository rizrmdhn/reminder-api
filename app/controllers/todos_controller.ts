import type { HttpContext } from '@adonisjs/core/http'
import { createTodoValidator, updateTodoValidator } from '#validators/todo'
import Todo from '#models/todo'
import * as nanoid from 'nanoid'

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
   * Handle form submission for the create action
   */
  async store({ auth, request, response }: HttpContext) {
    const user = await auth.use('jwt').authenticate()

    const { title, description } = await request.validateUsing(createTodoValidator)

    const todo = await Todo.create({
      todo_id: `todo_${nanoid.nanoid(16)}`,
      title,
      description,
      created_by: user.user_id,
    })

    return response.created({
      meta: {
        status: 201,
        message: 'Todo created',
      },
      data: todo,
    })
  }

  /**
   * Show individual record
   */
  async show({ auth, params, response }: HttpContext) {
    const user = await auth.use('jwt').authenticate()

    const todo = await Todo.query()
      .where('created_by', user.user_id)
      .where('todo_id', params.todo_id)
      .first()

    if (!todo) {
      return response.notFound({
        meta: {
          status: 404,
          message: 'Todo not found',
        },
      })
    }

    return response.ok({
      meta: {
        status: 200,
        message: 'Success',
      },
      data: todo,
    })
  }

  /**
   * Edit individual record
   */
  async edit({ auth, request, params, response }: HttpContext) {
    const user = await auth.use('jwt').authenticate()

    const { title, description } = await request.validateUsing(updateTodoValidator)

    const todo = await Todo.query()
      .where('created_by', user.user_id)
      .where('todo_id', params.todo_id)
      .first()

    if (!todo) {
      return response.notFound({
        meta: {
          status: 404,
          message: 'Todo not found',
        },
      })
    }

    todo.title = title
    todo.description = description

    await todo.save()

    return response.ok({
      meta: {
        status: 200,
        message: 'Todo updated',
      },
      data: todo,
    })
  }

  /**
   * Delete record
   */
  async destroy({ auth, params, response }: HttpContext) {
    const user = await auth.use('jwt').authenticate()

    const todo = await Todo.query()
      .where('created_by', user.user_id)
      .where('todo_id', params.todo_id)
      .first()

    if (!todo) {
      return response.notFound({
        meta: {
          status: 404,
          message: 'Todo not found',
        },
      })
    }

    await todo.delete()

    return response.ok({
      meta: {
        status: 200,
        message: 'Todo deleted',
      },
    })
  }
}
