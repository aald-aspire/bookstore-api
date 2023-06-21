import { SwaggerConfig } from '@ioc:Adonis/Addons/Swagger'

export default {
	uiEnabled: true, //disable or enable swaggerUi route
	uiUrl: 'docs', // url path to swaggerUI
	specEnabled: true, //disable or enable swagger.json route
	specUrl: '/swagger.json',

	middleware: [], // middlewares array, for protect your swagger docs and spec endpoints

	options: {
		definition: {
			openapi: '3.0.0',
			info: {
				title: 'BookStore API',
				version: '1.0.0',
				description: 'BookStore API swagger docs'
			},
			components: {
				securitySchemes: {
					bearerAuth: {
						type: 'http',
						scheme: 'bearer',
						bearerFormat: 'sha256'
					}
				},
				responses: {
					NoContent: {
						description: 'No Content (Corresponding table may has no records for example)'
					},
					Unauthorized: {
						description: 'Unauthorized Access (Due to expired/empty access token for example)',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										errors: {
											type: 'array',
											items: {
												type: 'object',
												properties: {
													message: {
														type: 'string',
														example: 'E_UNAUTHORIZED_ACCESS: Unauthorized access'
													}
												}
											}
										}
									}
								}
							}
						}
					},
					NotFound: {
						description: 'Not Found (Record doesn\'t exist or bad record id used)',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										errors: {
											type: 'array',
											items: {
												type: 'object',
												properties: {
													message: {
														type: 'string',
														example: 'Requested record not found'
													}
												}
											}
										}
									}
								}
							}
						}
					},
					InternalServerError: {
						description: 'Internal Server Error',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										message: {
											type: 'string',
											example: 'Unknown Server Error'
										}
									}
								}
							}
						}
					},
					ServiceUnavailable: {
						description: 'Service Unavailable',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										message: {
											type: 'string',
											example: 'Service Unavailable, Try Again Later'
										}
									}
								}
							}
						}
					},
				}
			}
		},

		apis: [
			'app/**/*.ts',
			'docs/swagger/**/*.yml',
			'start/routes.ts'
		],
		basePath: '/api/<version>'
	},
	mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',
  specFilePath: 'docs/swagger.json'
} as SwaggerConfig
