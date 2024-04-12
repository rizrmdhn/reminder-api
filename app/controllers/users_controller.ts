import type { HttpContext } from '@adonisjs/core/http'

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
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      },
    })
  }
}
