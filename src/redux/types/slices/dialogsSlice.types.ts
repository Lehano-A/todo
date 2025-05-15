import { TaskType } from '../../../components/Main/Task/task.types'
import { TaskColumnName } from '../../../components/Main/TaskColumns/taskColumns.types'

export type DialogName = 'dialogAddNewTask' | 'dialogEditTask' | 'dialogRemoveTask'

export interface DialogsState {
  dialogAddNewTask: {
    isActive: boolean
    data: TaskType
  }

  dialogEditTask: {
    isActive: boolean
    columnName: TaskColumnName | null
    data: TaskType
  }

  dialogRemoveTask: {
    isActive: boolean
    columnName: TaskColumnName | null
    data: TaskType
  }
}
