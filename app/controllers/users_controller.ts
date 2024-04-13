import { updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import env from '#start/env'
import fs from 'node:fs'
import * as nanoid from 'nanoid'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ auth, response }: HttpContext) {
    const user = await auth.use('jwt').authenticate()

    return response.ok({
      meta: {
        status: 200,
        message: 'Success',
      },
      data: {
        userId: user.user_id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        avatar: user.avatar,
        avatar_url: user.avatar_url,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      },
    })
  }

  /**
   * Edit individual record
   */
  async update({ auth, request, response }: HttpContext) {
    const user = await auth.use('jwt').authenticate()

    const { fullname, avatar } = await request.validateUsing(updateUserValidator)

    if (avatar) {
      // check if the user already has an avatar
      if (user.avatar) {
        // delete the existing avatar
        fs.unlinkSync(app.makePath('uploads/avatar', user.avatar))
      }

      const avatarName = `${nanoid.nanoid(16)}-${user.username}.${avatar.extname}`
      await avatar.move(app.makePath('uploads/avatar'), {
        name: avatarName,
      })

      user.avatar = avatarName
      user.avatar_url = env.get('APP_URL') + '/uploads/avatar/' + avatarName
    }

    if (fullname) {
      user.fullname = fullname
    }

    await user.save()

    return response.ok({
      meta: {
        status: 200,
        message: 'Success',
      },
      data: {
        userId: user.user_id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        avatar: user.avatar,
        avatar_url: user.avatar_url,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      },
    })
  }
}
