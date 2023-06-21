import { BaseCommand } from '@adonisjs/core/build/standalone'
import User from 'App/Models/User'

export default class CreateSuperUser extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'db:su'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Creates the super user account'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest` 
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call 
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    
    try {

      const user = await User.firstOrCreate({
        name: 'Super Admin User',
        email: 'superadmin@host.com'
      }, {
        name: 'Super Admin User',
        email: 'superadmin@host.com',
        password: 'P@$$vv0rd',
        role: 'admin',
        rememberMeToken: null
      })

      if(user.$isLocal)
        this.logger.info('Created Super User Successfully')
      else
        this.logger.warning('Super User Already Exists')

    } catch (exception) {
      this.logger.fatal(exception)
    }

  }
}
