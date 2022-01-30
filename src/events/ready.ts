import type { Client } from 'discord.js'

export const ready = {
  once: true,
  exec(client: Client) {
    if (client.user) {
      client.user.setPresence({
        activities: [{ name: 'Edward Penishands', type: 'WATCHING' }],
        status: 'online'
      })
      console.log(`Logged in as ${client.user.tag}!`)
    }
  }
}
