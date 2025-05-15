import { TasksType } from '../Task/task.types'

export type TaskColumnName = 'todo' | 'inProcess' | 'done'

export interface TaskColumn {
  columnName: keyof TasksType
  title: string
}

export interface StyledTaskColumnProps {
  $bgColor: string
}
