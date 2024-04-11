import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().maxLength(255),
    password: vine.string().minLength(8),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .minLength(3)
      .maxLength(255)
      .unique(async (db, value) => {
        // find a user with the same username
        const user = await db.from('users').where('username', value).first()
        return !user
      }),
    fullname: vine.string().maxLength(255),
    email: vine
      .string()
      .email()
      .maxLength(255)
      .unique(async (db, value) => {
        // find a user with the same email
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(8),
  })
)
