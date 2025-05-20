import { TaskType } from '../../../components/Main/TaskColumns/TaskItem/Task/task.types'

export interface TasksState {
  todo: TaskType[]
  inProcess: TaskType[]
  done: TaskType[]
}
