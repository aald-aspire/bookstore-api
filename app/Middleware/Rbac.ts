import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Rbac {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    // TODO: add role check logic
    await next()
  }
}
