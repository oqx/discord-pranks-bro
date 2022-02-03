import type { Client, Message } from 'discord.js'
import * as fromConstants from '../../constants'
import type { Commands } from '../../types'
import * as fromUtils from '../../utils'
import { CommentCache } from '../../utils'

/**
 * This is a troll feature to worry people that they've missed out
 * on receiving bitcoin. LOL
 * @param client
 * @param msg
 * @param subcommands
 */
class Tip {
  static sendInvalidArgs = (msg: Message) =>
    msg.reply(
      `Invalid arguments. Command requires two arguments: target user via mention and btc amount.`
    )

  constructor(
    client: Client,
    msg: Message,
    subcommands: Commands['subcommands']
  ) {
    const amount = parseFloat(subcommands[1])

    if (subcommands.length < 1 || Number.isNaN(amount) || !subcommands[0]) {
      Tip.sendInvalidArgs(msg)
      return
    }
    if (client.user && subcommands[0]) {
      if (msg.author.id !== process.env.DISCORD_AUTHOR_ID!) {
        msg.reply(`You must connect a bitcoin wallet to execute this command.`)
      } else if (msg.author.id === process.env.DISCORD_AUTHOR_ID!) {
        msg.reply(
          `Unable to deliver ${subcommands[1]} btc to ${subcommands[0]}. User has not connected a bitcoin wallet.`
        )
      }
    }
  }
}

class Darbee {
  static roll(client: Client, msg: Message) {
    const members = fromUtils.getLoggedInMembers(msg)
    if (!members) return
    const memberToHarass = members.random()
    if (!memberToHarass) return
    const comment = fromUtils.CommentCache.instance.comments[0]
    memberToHarass
      .send(comment.message)
      .then(() => {
        CommentCache.instance.remove(comment.id)
        msg.reply(`<@!${memberToHarass.id}> got rolled ayyyeeee`)
      })
      .catch((err) => {
        if (err instanceof Error) {
          fromUtils.dispatchMessageToAuthor(client, err.message)
        }
      })
  }

  constructor(
    client: Client,
    msg: Message,
    subcommands: Commands['subcommands']
  ) {
    if (subcommands[0] === 'roll') {
      Darbee.roll(client, msg)
    }
  }
}

export const COMMAND_MAP = {
  [fromConstants.SEXY_TIME]: 'https://www.youtube.com/watch?v=OPVyDuQFhuE',
  [fromConstants.DINNER_TIME]: 'https://www.youtube.com/watch?v=eXghL7YeF9Y',
  [fromConstants.BLOWJOB_BETTY]: 'https://www.youtube.com/watch?v=B53p6Nf-lHw',
  [fromConstants.ICEBERG]: 'https://www.youtube.com/watch?v=jm-EtKqvDZw',
  [fromConstants.TIP]: Tip,
  [fromConstants.DARBEE]: Darbee
}
