export type PornhubComment = {
  avatar: string
  username: string
  date: string
  message: string
  total_vote: number
}

export type CachedPornhubComment = {
  id: string
} & PornhubComment
