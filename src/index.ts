import { Client, Intents } from 'discord.js'
import * as fromUtils from './utils'
import * as fromEvents from './events'
import invariant from 'invariant'
import dotenv from 'dotenv'

dotenv.config()

const main = async () => {
  invariant(
    !!process.env.DISCORD_TOKEN && !!process.env.DISCORD_AUTHOR_ID,
    'DISCORD_TOKEN and DISCORD_AUTHOR_ID env variables are required.'
  )

  const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
  })

  client.login(process.env.DISCORD_TOKEN)

  client.once('ready', fromEvents.ready.exec)

  try {
    new fromUtils.CommentCache()
    fromUtils.cacheCommentBatch()
  } catch (err) {
    if (err instanceof Error) {
      /**
       * DM's me any errors that occur.
       */
      const dm = await client.users.createDM(process.env.DISCORD_AUTHOR_ID)
      dm.send(err.message)
    }
  }

  Object.entries(fromEvents).forEach(([name, obj]) => {
    if (obj.once) {
      // do something
    } else {
      client.on(name, (msg) => obj.exec(msg, client))
    }
  })
}

main()
