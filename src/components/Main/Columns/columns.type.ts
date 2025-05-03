import { TasksType } from '../Task/task.type'

export interface Columns {
  columnName: keyof TasksType
  title: string
}

export interface StyledColumnProps {
  $bgColor: string
}
