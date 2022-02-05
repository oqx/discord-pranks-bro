import { ActivitiesOptions } from 'discord.js'

const PRESENCE_LIST: ActivitiesOptions[] = [
  {
    type: 'STREAMING',
    name: 'Chaturbate'
  },
  {
    type: 'WATCHING',
    name: '1991 World Series'
  },
  {
    type: 'PLAYING',
    name: 'Club Penguin'
  },
  {
    type: 'LISTENING',
    name: 'Partyboi69 - Bathe with me'
  },
  {
    type: 'LISTENING',
    name: 'Girls L.G.B.N.A.F.'
  }
]

export const getRandomPresence = () =>
  PRESENCE_LIST[Math.floor(Math.random() * PRESENCE_LIST.length)]
