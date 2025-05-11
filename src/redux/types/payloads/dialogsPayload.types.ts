import { ColumnName } from '../../../components/Main/Columns/columns.types'
import { TaskType } from '../../../components/Main/Task/task.types'
import { DialogName } from '../slices/dialogsSlice.types'

export interface DialogOpenPayload {
  dialogName: DialogName
  columnName?: ColumnName | null
  data?: TaskType
}

export interface DialogClosePayload {
  dialogName: DialogName
}
