import React from 'react'

import { StyleParamsTaskType } from '../task.types'

interface CaclHeightTask {
  refTask: React.RefObject<HTMLDivElement>
  refTitle: React.RefObject<HTMLHeadingElement>
  refTextDescription: React.RefObject<HTMLParagraphElement>
  styleParamsTask: StyleParamsTaskType
  setStyleParamsTask: React.Dispatch<React.SetStateAction<StyleParamsTaskType>>
}
export function calcHeightTask({
  refTask,
  refTitle,
  refTextDescription,
  styleParamsTask,
  setStyleParamsTask,
}: CaclHeightTask) {
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
