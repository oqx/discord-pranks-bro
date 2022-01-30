import type * as fromTypes from '../types'
import { v4 as uuidv4 } from 'uuid'

export class CommentCache {
  /**
   * Cached comments
   */
  public comments: fromTypes.CachedPornhubComment[] = []

  /**
   * Singleton instance
   */
  static instance: CommentCache

  /**
   * @summary Adds UUID's to comments.
   * @param comments
   * @returns
   */
  static applyIds(comments: fromTypes.PornhubComment[]) {
    return comments.map((comment) => ({
      ...comment,
      id: uuidv4()
    }))
  }

  /**
   * @summary Instantiates singleton.
   */
  constructor() {
    if (CommentCache.instance) {
      return CommentCache.instance
    }

    CommentCache.instance = this
  }

  /**
   * @summary Remove a comment by ID.
   * @param id
   */
  public remove(id: string) {
    this.comments = this.comments.filter((comment) => comment.id !== id)
  }

  /**
   * @summary Adds UUID to new comments and merges them with cached
   * comments.
   * @param comments
   * @returns {fromTypes.CachedPornhubComment[]}
   */
  public add(
    comments: fromTypes.PornhubComment[]
  ): fromTypes.CachedPornhubComment[] {
    if (Array.isArray(comments) && comments.length) {
      this.comments = [...this.comments, ...CommentCache.applyIds(comments)]
    }

    return this.comments
  }
}
