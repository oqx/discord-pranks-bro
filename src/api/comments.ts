// @ts-ignore
import pornhub from '@justalk/pornhub-api'
import { getURLByRatio } from '../utils'
import type { PornhubComment } from '../types'

/**
 * Rolls the dice on gay/straight video odds and returns a
 * corresponding video's comments.
 * @param ratio
 * @returns
 */
export const getRandomVideoComments = (
  ratio = 50
): Promise<{ comments: PornhubComment[] }> =>
  pornhub.page(getURLByRatio(ratio), ['comments'])
