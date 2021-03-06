import { CommandoClient } from 'discord.js-commando'
import { onMessage } from './lib/events'
import { Config } from '../../../common'

export class Plugin {
  public static client: CommandoClient
  public static config: Config
  public static readonly id = 'Friends'
  public static readonly description =
    'Friend system plugin. Provides a better and more interactive friend system than Discord.'
  public static readonly commandGroups: ReadonlyArray<any> = [
    ['friends', 'Friends']
    // If you need to make command groups for the plugin's commands,
    // Add them here rather than adding them to the core bot.
    // Helps keep the plugins more independent from the bot.
    // ex. ['music', 'Music']
  ]

  /**
   * Initializes plugin
   */
  public async init(client: CommandoClient, config: Config) {
    Plugin.client = client
    Plugin.config = config
    await this.registerListeners(client)
  }

  /**
   * Register events
   */
  private async registerListeners(client: CommandoClient): Promise<void> {
    client.on('message', () => onMessage())
  }
}
