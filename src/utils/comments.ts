import { compose } from 'lodash/fp'
import { getRandomVideoComments } from '../api'
import { PornhubComment } from '../types'
import * as fromUtils from '../utils'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const BLACKLIST = ['http', 'www.', '.com', '.net', '.org']

/**
 * @summary Filters comments that contain URLS.
 * @param comments
 */
const filterOutCommentsWithUrls = (
  comments: PornhubComment[]
): PornhubComment[] =>
  comments.filter(
    (comment) =>
      !BLACKLIST.some((badValue) => comment.message.includes(badValue))
  )

/**
 * @summary Filters comments by vote count.
 * @param count
 */
const filterByVoteCount =
  (count = 3) =>
  (comments: PornhubComment[]): PornhubComment[] =>
    comments.filter((comment) => comment.total_vote >= count)

/**
 * @summary Places comments in a key/val cache.
 * @param {Set} cache
 */
export const cacheCommentBatch = async () => {
  for (let i = 0; i < 10; i++) {
    const { comments } = await getRandomVideoComments(50)
    const filtered = compose(
      filterOutCommentsWithUrls,
      filterByVoteCount(3)
    )(comments)

    fromUtils.CommentCache.instance.add(filtered)
    await sleep(1000)
  }
}
