import React from 'react'

import { StyleParamsTaskType, TaskElementsRefs } from '../task.types'

export interface CalсHeightTask {
  refs: TaskElementsRefs
  styleParamsTask: StyleParamsTaskType
  setStyleParamsTask: React.Dispatch<React.SetStateAction<StyleParamsTaskType>>
}
export function calcHeightTask({ refs, styleParamsTask, setStyleParamsTask }: CalсHeightTask) {
  const { refTask, refTitle, refTextDescription } = refs

  // ссылки на элементы
  const task = refTask.current
  const title = refTitle.current
  const textDescription = refTextDescription.current

  // значения styleParamsParent
  const paramsClosedTask = styleParamsTask.closed.task
  const closedTaskHeight = paramsClosedTask.height

  if (task && title && textDescription) {
    // значения высот элементов
    const taskHeight = task.clientHeight
    const titleHeight = title.clientHeight
    const textDescriptionHeight = textDescription.clientHeight
    const taskHeightWithoutValues = taskHeight - titleHeight - textDescriptionHeight

    // если ещё НЕ было присвоено значение в styleParamsParent.closed.task.height
    if (closedTaskHeight === null) {
      setStyleParamsTask((prevState) => ({
        ...prevState,
        closed: {
          task: {
            heightWithoutValues: taskHeightWithoutValues,
            height: taskHeight,
          },
        },
      }))
    }

    // если значение уже было присвоено в styleParamsParent.closed.task.height
    if (typeof closedTaskHeight === 'number') {
      const { heightWithoutValues } = paramsClosedTask

      if (heightWithoutValues) {
        setStyleParamsTask((prevState) => ({
          closed: {
            task: { ...prevState.closed.task, height: heightWithoutValues + titleHeight },
          },
          opened: {
            task: { ...prevState.opened.task, height: heightWithoutValues + titleHeight + textDescriptionHeight },
          },
        }))
      }
    }
  }
}
