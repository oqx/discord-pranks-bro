import type { LinkArgs } from './types'
import * as fromUtils from '../../utils'

export const respondToEmbedsAndAttachments = ({
  msg,
  client
}: LinkArgs): LinkArgs => {
  if (msg.attachments.size > 0 || msg.embeds.length > 0) {
    try {
      /**
       * If comments are running low, retrieve a new batch and add
       * them to CommentCache.
       */
      if (fromUtils.CommentCache.instance.comments.length <= 10) {
        fromUtils.cacheCommentBatch()
      }
      /**
       * Retrieves the first comment and dispatches it to the client.
       */
      const { message } = fromUtils.CommentCache.instance.comments[0]
      msg.reply(message)
    } catch (err) {
      if (err instanceof Error) {
        fromUtils.dispatchMessageToAuthor(client, err.message)
      }
      console.error(err)
    }
  }
  return { msg, client }
}
