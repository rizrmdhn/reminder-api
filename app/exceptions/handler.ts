import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { errors as coreError } from '@adonisjs/core'
import { errors as authError } from '@adonisjs/auth'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof authError.E_INVALID_CREDENTIALS) {
      return ctx.response.badRequest({
        meta: {
          status: 400,
          message: 'Unable to find user with provided credentials',
        },
      })
    }

    if (error instanceof authError.E_UNAUTHORIZED_ACCESS) {
      return ctx.response.unauthorized({
        meta: {
          status: 401,
          message: 'Unauthorized access',
        },
      })
    }

    if (error instanceof coreError.E_ROUTE_NOT_FOUND) {
      return ctx.response.notFound({
        meta: {
          status: 404,
          message: 'Route not found',
        },
      })
    }

    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
