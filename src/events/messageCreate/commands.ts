import type { Client, Message } from 'discord.js'
import * as fromConstants from '../../constants'
import type { Commands } from '../../types'
import * as fromUtils from '../../utils'
import { CommentCache, getUserFromMention } from '../../utils'

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

const ROLL_SUCCESS_MSG = [
  'butt stank',
  'got rolololololed',
  'got the old darbee special'
]

const getRandomSuccessMsg = () =>
  ROLL_SUCCESS_MSG[Math.floor(Math.random() * ROLL_SUCCESS_MSG.length)]

/**
 * @TODO Clean up this code. Move it into its own file.
 */
class Darbee {
  static async roll(client: Client, msg: Message) {
    const members = fromUtils.getLoggedInMembers(msg)
    if (!members) return

    /**
     * Iterate through length of members to allow the
     * message to send to another user if the first user
     * cannot receive bot messages.
     */
    for (let i = 0; i < members.size; i++) {
      try {
        const mbr = members.random()
        if (!mbr) return
        /**
         * @TODO Decouple logic below into own func.
         */
        const comment = fromUtils.CommentCache.instance.comments[0]
        await mbr.send(comment.message)
        CommentCache.instance.remove(comment.id)
        await msg.reply(`<@!${mbr.id}> ${getRandomSuccessMsg()}`)
        break
      } catch (_err) {
        if (i === members.size) {
          await msg.reply(
            `no mf i can shitpost to atm. users must have bot messages enabled.`
          )
          break
        }
        continue
      }
    }
  }

  /**
   * @summary Sends individual users a PH comment.
   * @example !darbee creepOn @userName
   * @param client
   * @param msg
   * @param subcommands
   */
  static async creepOn(
    client: Client,
    msg: Message,
    subcommands: Commands['subcommands']
  ) {
    if (subcommands.length !== 2) {
      await msg.reply('Command requres two arguments: `!darbee creepOn @user`')
    }
    const member = await getUserFromMention(client, subcommands[1])
    if (!member) return
    try {
      /**
       * @TODO Since this logic is used in roll, it could be
       * decoupled into its own func.
       */
      const comment = fromUtils.CommentCache.instance.comments[0]
      await member.send(comment.message)
      CommentCache.instance.remove(comment.id)
      msg.reply(`dude ${getRandomSuccessMsg()}`)
    } catch (err) {
      msg.reply('mf got me blocked.')
    }
  }

  /**
   * @summary Receives subcommands when root command
   * is called.
   * @param client
   * @param msg
   * @param subcommands
   */
  constructor(
    client: Client,
    msg: Message,
    subcommands: Commands['subcommands']
  ) {
    /**
     * @TODO Create subcommand constants and ensure
     * first subcommand exists in it. Second command --
     * not so much. It can be a mention.
     */
    switch (subcommands[0]) {
      case 'roll':
        return Darbee.roll(client, msg)
      case 'creepOn':
        return Darbee.creepOn(client, msg, subcommands)
      default:
        return
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
