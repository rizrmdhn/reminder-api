import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator, registerValidator } from '#validators/auth'
import User from '#models/user'
import * as nanoid from 'nanoid'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)

    return response.ok({
      meta: {
        status: 200,
        message: 'Success',
      },
      data: token,
    })
  }

  async register({ request, response }: HttpContext) {
    const { email, fullname, password, username } = await request.validateUsing(registerValidator)

    const user = await User.create({
      user_id: `user_${nanoid.nanoid(16)}`,
      email,
      fullname: fullname,
      password,
      username,
    })

    return response.created({
      meta: {
        status: 201,
        message: 'User created',
      },
      data: {
        user_id: user.user_id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      },
    })
  }

  async logout({ auth, response }: HttpContext) {
    await User.accessTokens.delete(auth.user!, auth.user!.currentAccessToken.identifier)

    return response.ok({
      meta: {
        status: 200,
        message: 'Success',
      },
    })
  }
}
