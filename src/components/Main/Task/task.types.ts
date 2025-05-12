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
  initial: {
    height: number | null
  }
  withOpenedDescription: {
    height: number | null
  }
}

export interface StyledTaskProps {
  $styleTaskElements: TaskControlProps['$styleTaskElements']
  $isTaskDone: boolean
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
  deadline: { bg: { main: string; done: string } }
  control: { fill: string; hover: string }
}

export interface TaskControlProps {
  $styleTaskElements: StyleTaskElements
}
