import { TaskType } from '../../../components/Main/Task/task.type'

export interface TasksState {
  todo: TaskType[]
  inProcess: TaskType[]
  done: TaskType[]
}
