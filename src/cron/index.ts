import cron from 'node-cron'

/**
 * @summary Runs a cron job on a callback every two hours.
 * @param cb
 */
export const runEveryTwoHours = (cb: () => void) => {
  cron.schedule('* * 2 * *', () => {
    cb()
  })
}
