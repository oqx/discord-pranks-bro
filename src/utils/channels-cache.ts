import type * as fromTypes from '../types'

export class ChannelCache {
  /**
   * Cached comments
   */
  public channels: Record<string, fromTypes.ChannelSettings>

  /**
   * Singleton instance
   */
  static instance: ChannelCache

  /**
   * @summary Instantiates singleton with initial comments.
   * @param param0
   * @returns
   */
  constructor() {
    if (ChannelCache.instance) {
      return ChannelCache.instance
    }

    ChannelCache.instance = this
  }

  /**
   * @summary Adds UUID to new comments and merges them with cached
   * comments.
   * @param comments
   * @returns {fromTypes.CachedPornhubComment[]}
   */
  public add({
    id,
    gaytio
  }: {
    id: string
    gaytio: number
  }): fromTypes.ChannelSettings {
    this.channels[id] = {
      gaytio
    }

    return this.channels[id]
  }
}
