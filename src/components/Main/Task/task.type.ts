import { StyleParamsParentType } from './Task'

export interface TasksType {
  todo: TaskType[]
  inProcess: TaskType[]
  done: TaskType[]
}

export interface TaskType {
  id: string
  nameTask: string
  description: string
  deadline: string
}

export interface StyledTaskProps {
  $hasDeadline?: boolean
  $styleParamsParent?: StyleParamsParentType
  $isDisabledButtonShowDescription?: boolean
  $isActiveDescription?: boolean
  $wasClickedButtonDescription?: boolean
}
