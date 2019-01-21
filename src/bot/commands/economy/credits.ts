import { Message } from 'discord.js'
import { Command, CommandoMessage, CommandoClient } from 'discord.js-commando'
import { UserService } from '../../services'

export default class CreditsCommand extends Command {
  constructor (client: CommandoClient) {
    super(client, {
      name: 'credits',
      group: 'economy',
      memberName: 'credits',
      aliases: [ 'balance', 'bal' ],
      description: 'Check how many credits you or someone else has.',
      guildOnly: false,
      throttling: {
        usages: 2,
        duration: 3
      },
      args: [
        {
          key: 'user',
          prompt: 'Whose credits would you like to view?\n',
          type: 'member',
          default: ''
        }
      ]
    })
  }

  public async run (msg: CommandoMessage, args: any): Promise<Message | Message[]> {
    const userId = args.user ? args.user.id : msg.author.id
    const userName = args.user ? args.user.displayName : msg.author.username

    const user = await new UserService().find(userId)
    const credits = user ? user.balance.balance : 0
    const dollarEmoji = '💵'

    return msg.channel.send(
      `${userName} has ${dollarEmoji} ${credits} credits.`
    )
  }
}
