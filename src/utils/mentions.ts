import { Client, MessageMentions } from 'discord.js'

export function getUserFromMention(client: Client, mention: string) {
  const matches = mention.match(MessageMentions.USERS_PATTERN)
  if (!matches) return
  const id = matches[1]
  return client.users.cache.get(id)
}
