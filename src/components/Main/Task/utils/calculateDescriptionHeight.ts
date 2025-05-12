import React from 'react'

import increment from '../../../../utils/increment'
import { StyleParamsParentType } from '../task.types'

// вычислить высоту для элемента Description
export function calculateDescriptionHeight(
  styleParamsParent: StyleParamsParentType,
  setStyleParamsParent: React.Dispatch<React.SetStateAction<StyleParamsParentType>>,
  refTask: React.RefObject<HTMLDivElement>,
  refTextDescription: React.RefObject<HTMLParagraphElement>
) {
  if (refTask.current && refTextDescription.current) {
    const { initial, withOpenedDescription } = styleParamsParent

    // если начальная высота задачи (в закрытом виде) была назначена
    if (initial.height) {
      const clientHeightTask = withOpenedDescription.height === null ? refTask.current.clientHeight : initial.height
      const clientHeightText = refTextDescription.current.clientHeight
      const values = [clientHeightTask, clientHeightText] // значения для высоты параграфа

      if (values.every((value): value is number => typeof value === 'number')) {
        const calculatedHeight = increment(values)

        typeof calculatedHeight === 'number' &&
          setStyleParamsParent((prevState) => ({
            ...prevState,
            withOpenedDescription: { height: calculatedHeight },
          }))
      }
    }

    // если начальная высота задачи (в закрытом виде) ещё НЕ была назначена
    if (initial.height === null) {
      const offsetHeightTask = refTask.current.offsetHeight

      setStyleParamsParent((prevState) => ({ ...prevState, initial: { height: offsetHeightTask } }))
    }
  }
}
