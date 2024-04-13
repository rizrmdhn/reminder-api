import vine from '@vinejs/vine'

export const createReminderValidator = vine.compile(
  vine.object({
    idTodo: vine
      .string()
      .maxLength(255)
      .exists(async (db, value) => {
        const todo = await db.from('todos').where('todo_id', value).first()
        return todo
      }),
    title: vine.string().maxLength(255),
    description: vine.string().maxLength(2555),
    timeReminder: vine.string().minLength(3),
  })
)

export const updateReminderValidator = vine.compile(
  vine.object({
    title: vine.string().maxLength(255),
    description: vine.string().maxLength(2555),
    timeReminder: vine.string().optional(),
  })
)
