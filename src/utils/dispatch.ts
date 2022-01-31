import type { Client } from 'discord.js'

/**
 * @summary Sends a message to the bot's author.
 * @param client
 * @param message
 */
export const dispatchMessageToAuthor = (client: Client, message: string) => {
  client.users.createDM(process.env.DISCORD_AUTHOR_ID!).then((dm) => {
    dm.send(message)
  })
}
