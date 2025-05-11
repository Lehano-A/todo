import { DraggableProvided } from '@hello-pangea/dnd'

import { ColumnName } from '../Columns/columns.types'

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

export interface TaskProps {
  data: TaskType
  currentColumnLocation: ColumnName
  provided?: DraggableProvided
}

export interface StyleParamsParentType {
  default: {
    height: string | null
  }
  withDescription: {
    height: string | null
  }
}

export interface StyledTaskProps {
  $styleTaskElements: TaskControlProps['$styleTaskElements']
  $hasDeadline?: boolean
  $styleParamsParent: StyleParamsParentType
  $isDisabledButtonShowDescription?: boolean
  $isActiveDescription?: boolean
  $wasClickedButtonDescription?: boolean
}

export interface TextDescriptionProps {
  $isActiveDescription: StyledTaskProps['$isActiveDescription']
  $wasClickedButtonDescription: StyledTaskProps['$wasClickedButtonDescription']
}

export interface StyleTaskElements {
  bg: string
  deadline: { bg: string }
  control: { fill: string; hover: string }
}

export interface TaskControlProps {
  $styleTaskElements: StyleTaskElements
}
