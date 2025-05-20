import { TaskType } from '../../../components/Main/TaskColumns/TaskItem/Task/task.types'
import { TaskColumnName } from '../../../components/Main/TaskColumns/taskColumns.types'

export type DialogName = 'dialogAddNewTask' | 'dialogEditTask' | 'dialogRemoveTask'

export interface DialogsState {
  dialogAddNewTask: {
    isActive: boolean
    dataTask: TaskType
  }

  dialogEditTask: {
    isActive: boolean
    columnName: TaskColumnName | null
    dataTask: TaskType
  }

  dialogRemoveTask: {
    isActive: boolean
    columnName: TaskColumnName | null
    dataTask: TaskType
  }
}
