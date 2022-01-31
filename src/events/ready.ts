import type { Client } from 'discord.js'
import { runEveryTwoHours } from '../cron'
import { getRandomPresence } from '../utils'

export const ready = {
  once: true,
  exec(client: Client) {
    if (client.user) {
      client.user?.setPresence({
        status: 'online',
        activities: [getRandomPresence()]
      })
      runEveryTwoHours(() => {
        client.user?.setPresence({
          status: 'online',
          activities: [getRandomPresence()]
        })
      })
      console.log(`Logged in as ${client.user.tag}!`)
    }
  }
}
