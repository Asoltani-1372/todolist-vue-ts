import type {  TodoStatusList } from '@/constants'



export type Todos = {
  id: string
  name: string
    desc : string
  status: Status
}

type Status = typeof TodoStatusList[number]
