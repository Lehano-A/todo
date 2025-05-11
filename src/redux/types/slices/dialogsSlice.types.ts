import { ColumnName } from '../../../components/Main/Columns/columns.types'
import { TaskType } from '../../../components/Main/Task/task.types'

export type DialogName = 'dialogAddNewTask' | 'dialogEditTask' | 'dialogRemoveTask'

export interface DialogsState {
  dialogAddNewTask: {
    isActive: boolean
    data: TaskType
  }

  dialogEditTask: {
    isActive: boolean
    columnName: ColumnName | null
    data: TaskType
  }

  dialogRemoveTask: {
    isActive: boolean
    columnName: ColumnName | null
    data: TaskType
  }
}
