import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@poppinss/utils'

export default class RbacMiddleware {

  public async handle (
    ctx: HttpContextContract,
    next: () => Promise<void>,
    roles: string
  ) {

    const role_list = roles

    const user: any = ctx.auth.user ?? null

    if(user === null || !role_list.includes(user.role)) {
      throw new Exception(
        'Access Forbidden, No Permission',
        403,
        'E_ACCESS_FORBIDDEN'
      )
    }

    await next()
  }

}
