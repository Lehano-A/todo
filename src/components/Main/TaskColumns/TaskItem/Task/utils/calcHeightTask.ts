import React from 'react'

import { StyleParamsTaskType, TaskElementsRefs } from '../task.types'

export interface CalсHeightTask {
  refs: TaskElementsRefs
  styleParamsTask: StyleParamsTaskType
  setStyleParamsTask: React.Dispatch<React.SetStateAction<StyleParamsTaskType>>
}

export function calcHeightTask({ refs, styleParamsTask, setStyleParamsTask }: CalсHeightTask) {
  const { refTask, refTitle, refContentBox } = refs

  // ссылки на элементы
  const task = refTask?.current
  const title = refTitle?.current
  const contentBox = refContentBox?.current

  // значения styleParamsParent
  const paramsClosedTask = styleParamsTask.closed.task
  const closedTaskHeight = paramsClosedTask.height

  if (task && title && contentBox) {
    // значения высот элементов
    const taskHeight = task.clientHeight
    const titleHeight = title.clientHeight
    const contentBoxHeight = contentBox.clientHeight
    const taskHeightWithoutContent = taskHeight - titleHeight - contentBoxHeight

    // если ещё НЕ было присвоено значение в styleParamsParent.closed.task.height
    if (closedTaskHeight === null) {
      setStyleParamsTask((prevState) => ({
        ...prevState,
        closed: {
          task: {
            heightWithoutContent: taskHeightWithoutContent,
            height: taskHeight,
          },
        },
      }))
    }

    // если значение уже было присвоено в styleParamsParent.closed.task.height
    if (typeof closedTaskHeight === 'number') {
      const { heightWithoutContent } = paramsClosedTask

      if (heightWithoutContent) {
        setStyleParamsTask((prevState) => ({
          closed: {
            task: { ...prevState.closed.task, height: heightWithoutContent + titleHeight },
          },
          opened: {
            task: { ...prevState.opened.task, height: heightWithoutContent + titleHeight + contentBoxHeight },
          },
        }))
      }
    }
  }
}
