import { TaskType } from '../../../components/Main/Task/task.types'

export interface TasksState {
  todo: TaskType[]
  inProcess: TaskType[]
  done: TaskType[]
}
