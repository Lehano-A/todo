import { TaskType } from '../../../components/Main/TaskColumns/TaskItem/Task/task.types'
import { TaskColumnName } from '../../../components/Main/TaskColumns/taskColumns.types'

export interface RemoveTaskPayload {
  columnName: TaskColumnName
  id: string
}

export interface TransferTaskPayload {
  columnFrom: TaskColumnName
  columnWhere: TaskColumnName
  idPlaceFrom: number
  idPlaceWhere: number
}

export interface EditTaskPayload {
  id: string
  columnName: TaskColumnName
  newData: TaskType
}
