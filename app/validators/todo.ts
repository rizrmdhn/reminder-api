import vine from '@vinejs/vine'

export const createTodoValidator = vine.compile(
  vine.object({
    title: vine.string().maxLength(255),
    description: vine.string().maxLength(2555),
  })
)

export const updateTodoValidator = vine.compile(
  vine.object({
    title: vine.string().maxLength(255),
    description: vine.string().maxLength(2555),
  })
)
