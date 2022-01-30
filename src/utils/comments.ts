import { getRandomVideoComments } from '../api'
import * as fromUtils from '../utils'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * @summary Places comments in a key/val cache.
 * @param {Set} cache
 */
export const cacheCommentBatch = async () => {
  for (let i = 0; i < 10; i++) {
    const { comments } = await getRandomVideoComments(50)
    fromUtils.CommentCache.instance.add(comments)
    await sleep(1000)
  }
}
