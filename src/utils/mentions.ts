import { Client } from 'discord.js'

export function getUserFromMention(client: Client, mention: string) {
  const id = mention.replace(/[\\<>@#&!]/g, '')
  console.log('matches', id)
  if (!id) return
  return client.users.cache.get(id)
}
