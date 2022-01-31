import type { Client, Message } from 'discord.js'
import { Commands } from '../../types'

/**
 * This is a troll feature to worry people that they've missed out
 * on receiving bitcoin. LOL
 * @param client
 * @param msg
 * @param subcommands
 */
export const tip = (
  client: Client,
  msg: Message,
  subcommands: Commands['subcommands']
) => {
  const amount = parseFloat(subcommands[1])

  if (subcommands.length < 1 || Number.isNaN(amount) || !subcommands[0]) {
    msg.reply(
      `Invalid arguments. Command requires two arguments: target user via mention and btc amount.`
    )
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
