import type { Message, Client } from 'discord.js'
import * as fromMentions from './mentions'
import * as fromMedia from './media'
import { compose } from '@typed/compose'

const queue = new Map<string, Message>()

const handleMessage = compose(
  fromMedia.respondToEmbedsAndAttachments,
  fromMentions.emoteOnCalloutWithoutExplicitMention,
  fromMentions.respondToMention
)

/**
 * @summary Event handler for messageCreate events. Handles
 * attachments and embeds, replying to thm with a pornhub comment.
 */
export const messageCreate = {
  once: false,
  async exec(msg: Message, client: Client) {
    handleMessage({ msg, client, queue })
  }
}
