import type { Message, Client } from 'discord.js'
import * as fromMentions from './mentions'
import * as fromMedia from './media'
import * as fromUtils from '../../utils'
import * as fromCommands from './commands'
import compose from 'lodash/fp/compose'

const applyGeneralMsgFns = compose(
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
    /**
     * Handles commands.
     */
    const commands = fromUtils.getCommand(msg.content)

    if (
      commands &&
      commands.command &&
      fromUtils.isValidCommand(commands.command)
    ) {
      try {
        /**
         * 'apply' strings in COMMAND_MAP indicate there's a corresponding
         * fn. The better approach is to pull COMMAND_MAP out of constants
         * and actually put functions on it to avoid the weirdness below.
         *
         * @TODO Refactor this, adding fns to COMMAND_MAP.
         */
        const cmd = fromCommands.COMMAND_MAP[commands.command]
        if (typeof cmd === 'string') {
          msg.reply(cmd)
        } else if (typeof cmd === 'function') {
          new cmd(client, msg, commands.subcommands)
          return
        }
      } catch (err) {
        if (err instanceof Error) {
          fromUtils.dispatchMessageToAuthor(client, err.message)
        }
      }
    } else {
      /**
       * Handles various interactions.
       */
      applyGeneralMsgFns({ msg, client })
    }
  }
}
