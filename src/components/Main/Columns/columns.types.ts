import { TasksType } from '../Task/task.types'

export type ColumnName = 'todo' | 'inProcess' | 'done'

export interface Columns {
  columnName: keyof TasksType
  title: string
}

export interface StyledColumnProps {
  $bgColor: string
}
