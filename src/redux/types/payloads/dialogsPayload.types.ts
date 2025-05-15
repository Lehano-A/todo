import { TaskType } from '../../../components/Main/Task/task.types'
import { TaskColumnName } from '../../../components/Main/TaskColumns/taskColumns.types'
import { DialogName } from '../slices/dialogsSlice.types'

export interface DialogOpenPayload {
  dialogName: DialogName
  columnName?: TaskColumnName | null
  data?: TaskType
}

export interface DialogClosePayload {
  dialogName: DialogName
}
