import { MENTIONS } from '../../constants/mentions'
import type { LinkArgs } from './types'

export const emoteOnCalloutWithoutExplicitMention = ({
  msg,
  ...params
}: LinkArgs): LinkArgs => {
  if (msg.content.toLowerCase().includes('darbee')) {
    msg.react('🍆')
    msg.react('💦')
  }
  return { ...params, msg }
}

export const respondToMention = ({
  msg,
  client,
  ...params
}: LinkArgs): LinkArgs => {
  if (client.user && msg.content.includes(`<@!${client.user.id}>`)) {
    msg.reply(MENTIONS[0])
  }
  return { ...params, msg, client }
}
