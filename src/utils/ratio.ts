import * as fromConstants from '../constants'

/**
 * Determines the ratio of gay-to-straight porn comments a channel sees.
 * @param {number} ratio Percentage of gay porn comments that should appear.
 */
export const getURLByRatio = (ratio = 50) => {
  const odds = Math.floor(Math.random() * 100)
  if (odds <= ratio) {
    return `${fromConstants.PORNHUB_ROOT}${fromConstants.PORNHUB_RANDOM_GAY_VIDEO}`
  }
  return `${fromConstants.PORNHUB_ROOT}${fromConstants.PORNHUB_RANDOM_VIDEO}`
}
