import { DraggableProvided } from '@hello-pangea/dnd'

import { TaskColumnName } from '../TaskColumns/taskColumns.types'

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
  ordinalNumber: number
  currentColumnLocation: TaskColumnName
  provided?: DraggableProvided
}

export interface TaskElementsRefs {
  refTask: React.RefObject<HTMLDivElement>
  refTitle: React.RefObject<HTMLHeadingElement>
  refTextDescription: React.RefObject<HTMLParagraphElement>
}

export interface StyleParamsTaskType {
  closed: {
    task: { heightWithoutValues: number | null; height: number | null }
  }
  opened: {
    task: { heightWithoutValues: number | null; height: number | null }
  }
}

export interface InnerBoxTaskBodyProps {
  $styleTaskElements: TaskControlProps['$styleTaskElements']
  $isTaskDone: boolean
  $hasDeadline?: boolean
  $styleParamsTask: StyleParamsTaskType
  $isDisabledButtonShowDescription?: boolean
  $isActiveDescription?: boolean
  $wasClickedButtonDescription?: boolean
}

export interface TextDescriptionProps {
  $isActiveDescription: InnerBoxTaskBodyProps['$isActiveDescription']
  $wasClickedButtonDescription: InnerBoxTaskBodyProps['$wasClickedButtonDescription']
}

export interface StyleTaskElements {
  bg: string
  deadline: { bg: { main: string; done: string } }
  control: { fill: string; hover: string }
}

export interface TaskControlProps {
  $styleTaskElements: StyleTaskElements
}
