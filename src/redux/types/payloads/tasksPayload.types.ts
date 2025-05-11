import { ColumnName } from '../../../components/Main/Columns/columns.types'
import { TaskType } from '../../../components/Main/Task/task.types'

export interface RemoveTaskPayload {
  columnName: ColumnName
  id: string
}

export interface TransferTaskPayload {
  columnFrom: ColumnName
  columnWhere: ColumnName
  idPlaceFrom: number
  idPlaceWhere: number
}

export interface EditTaskPayload {
  id: string
  columnName: ColumnName
  newData: TaskType
}
