import vine from '@vinejs/vine'

export const updateUserValidator = vine.compile(
  vine.object({
    fullname: vine.string().maxLength(255).optional(),
    avatar: vine
      .file({
        size: '2mb',
        extnames: ['jpg', 'png', 'jpeg'],
      })
      .optional(),
  })
)
