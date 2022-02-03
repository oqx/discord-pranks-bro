import type { Message } from 'discord.js'

export const getLoggedInMembers = (msg: Message) => {
  if (!msg.guild) return
  return msg.guild.members.cache.filter(
    (mem) => !!mem && mem.presence?.status === 'online'
  )
}
