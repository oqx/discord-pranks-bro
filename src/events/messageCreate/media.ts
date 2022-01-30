import type { LinkArgs } from './types'
import * as fromUtils from '../../utils'

export const respondToEmbedsAndAttachments = ({
  msg,
  client,
  queue
}: LinkArgs): LinkArgs => {
  if (msg.attachments.size > 0 || msg.embeds.length > 0) {
    try {
      queue.set(msg.id, msg)
      /**
       * If comments are running low, retrieve a new batch and add
       * them to CommentCache.
       */
      if (fromUtils.CommentCache.instance.comments.length <= 10) {
        fromUtils.cacheCommentBatch()
      }
      for (const [key, queuedMsg] of queue.entries()) {
        /**
         * Retrieves the first comment and dispatches it to the client.
         */
        const { message, id } = fromUtils.CommentCache.instance.comments[0]
        queuedMsg.reply(message).then(() => queue.delete(key))

        /**
         * Removes the sent comment from cache.
         */
        fromUtils.CommentCache.instance.remove(id)
      }
    } catch (err) {
      if (err instanceof Error) {
        /**
         * DM's me any errors that occur.
         */
        client.users.createDM(process.env.DISCORD_AUTHOR_ID!).then((dm) => {
          dm.send(
            err instanceof Error
              ? err.message
              : 'An error as occured in respondToEmbedsAndAttachments.'
          )
        })
      }
      console.error(err)
    }
  }
  return { msg, client, queue }
}
