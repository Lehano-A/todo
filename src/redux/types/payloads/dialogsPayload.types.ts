import { TaskType } from '../../../components/Main/TaskColumns/TaskItem/Task/task.types'
import { TaskColumnName } from '../../../components/Main/TaskColumns/taskColumns.types'
import { DialogName } from '../slices/dialogsSlice.types'

export interface DialogOpenPayload {
  dialogName: DialogName
  columnName?: TaskColumnName | null
  dataTask?: TaskType
}

export interface DialogClosePayload {
  dialogName: DialogName
}
