import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator, registerValidator } from '#validators/auth'
import User from '#models/user'
import * as nanoid from 'nanoid'
import app from '@adonisjs/core/services/app'
import env from '#start/env'

export default class AuthController {
  async login({ auth, request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    const token = await auth.use('jwt').generate(user)

    return response.ok({
      meta: {
        status: 200,
        message: 'Success',
      },
      data: token,
    })
  }

  async register({ request, response }: HttpContext) {
    const { email, fullname, password, username, avatar } =
      await request.validateUsing(registerValidator)

    if (avatar) {
      const avatarName = `${nanoid.nanoid(16)}-${username}.${avatar.extname}`
      await avatar.move(app.makePath('uploads'), {
        name: avatarName,
      })
    }

    const user = await User.create({
      user_id: `user_${nanoid.nanoid(16)}`,
      email,
      fullname: fullname,
      password,
      username,
      avatar: avatar ? avatar.fileName : null,
      avatar_url: avatar ? env.get('APP_URL') + '/uploads/' + avatar.fileName : null,
    })

    return response.created({
      meta: {
        status: 201,
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
