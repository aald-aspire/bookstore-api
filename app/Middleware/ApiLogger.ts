import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'

export default class ApiLogger {

	public async handle (
	    ctx: HttpContextContract,
	    next: () => Promise<void>
  	) {
  		// TODO: Adjust to rely on config parameters in order to gain more control during runtime

  		Logger.info('%s %s => Request: %o', ctx.request.method(), ctx.request.url(), ctx.request.body())

  		await next()

  		const status = ctx.response.getStatus()

  		if(status !== null) {
  			switch (Math.floor(status / 100)) {
  				case 4:
  					// Logger.warn('%s %s => Response: %o', ctx.request.method(), ctx.request.url(), ctx.response.getHeaders())
  					Logger.error('%s %s => Response: %o', ctx.request.method(), ctx.request.url(), ctx.response.getBody() ?? {})
  					break
  				case 5:
  					Logger.fatal('%s %s => Response: %o', ctx.request.method(), ctx.request.url(), ctx.response.getBody() ?? {})
  					break
  				default:
  					Logger.info('%s %s => Response: %o', ctx.request.method(), ctx.request.url(), ctx.response.getBody() ?? {})
  			}
  		}
  	}
}