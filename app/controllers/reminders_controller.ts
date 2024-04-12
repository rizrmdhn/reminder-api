import Reminder from '#models/reminder'
import { createReminderValidator, updateReminderValidator } from '#validators/reminder'
import type { HttpContext } from '@adonisjs/core/http'
import * as nanoid from 'nanoid'

export default class RemindersController {
  /**
   * Display a list of resource
   */
  async index({ auth, response }: HttpContext) {
    const user = await auth.use('jwt').authenticate()

    const reminders = await Reminder.query().where('created_by', user.user_id)

    return response.ok({
      meta: {
        status: 200,
        message: 'Success',
      },
      data: reminders,
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ auth, request, response }: HttpContext) {
    const user = await auth.use('jwt').authenticate()

    const { idTodo, title, description, timeReminder } =
      await request.validateUsing(createReminderValidator)

    const reminder = await Reminder.create({
      reminder_id: `reminder_${nanoid.nanoid(16)}`,
      id_todo: idTodo,
      title,
      description,
      time_reminder: timeReminder,
      created_by: user.user_id,
    })

    return response.created({
      meta: {
        status: 201,
        message: 'Success',
      },
      data: reminder,
    })
  }

  /**
   * Show individual record
   */
  async show({ auth, params, response }: HttpContext) {
    const user = await auth.use('jwt').authenticate()

    const reminder = await Reminder.query()
      .where('created_by', user.user_id)
      .where('reminder_id', params.reminder_id)
      .first()

    if (!reminder) {
      return response.notFound({
        meta: {
          status: 404,
          message: 'Reminder not found',
        },
      })
    }

    return response.ok({
      meta: {
        status: 200,
        message: 'Success',
      },
      data: reminder,
    })
  }

  /**
   * Edit individual record
   */
  async edit({ auth, request, params, response }: HttpContext) {
    const user = await auth.use('jwt').authenticate()

    const { title, description, timeReminder } =
      await request.validateUsing(updateReminderValidator)

    const reminder = await Reminder.query()
      .where('created_by', user.user_id)
      .where('reminder_id', params.reminder_id)
      .first()

    if (!reminder) {
      return response.notFound({
        meta: {
          status: 404,
          message: 'Reminder not found',
        },
      })
    }

    reminder.title = title
    reminder.description = description
    reminder.time_reminder = timeReminder ?? reminder.time_reminder

    await reminder.save()

    return response.ok({
      meta: {
        status: 200,
        message: 'Success',
      },
      data: reminder,
    })
  }

  /**
   * Delete record
   */
  async destroy({ auth, params, response }: HttpContext) {
    const user = await auth.use('jwt').authenticate()

    const reminder = await Reminder.query()
      .where('created_by', user.user_id)
      .where('reminder_id', params.reminder_id)
      .first()

    if (!reminder) {
      return response.notFound({
        meta: {
          status: 404,
          message: 'Reminder not found',
        },
      })
    }

    await reminder.delete()

    return response.ok({
      meta: {
        status: 200,
        message: 'Success',
      },
    })
  }
}
