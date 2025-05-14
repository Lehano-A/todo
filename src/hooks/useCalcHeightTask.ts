import { useEffect } from 'react'

import { TaskElementsRefs, TaskProps } from '../components/Main/Task/task.types'
import { CalсHeightTask, calcHeightTask } from '../components/Main/Task/utils/calcHeightTask'

interface UseCalcHeightTaskProps {
  data: TaskProps['data']
  wasClickedButtonDescription: boolean
  styleParamsTask: CalсHeightTask['styleParamsTask']
  setStyleParamsTask: CalсHeightTask['setStyleParamsTask']
  refs: TaskElementsRefs
}

export function useCalcHeightTask({
  data,
  refs,
  styleParamsTask,
  setStyleParamsTask,
  wasClickedButtonDescription,
}: UseCalcHeightTaskProps) {
  const { refTask, refTextDescription } = refs

  useEffect(() => {
    // после монтирования компонента, без document.fonts.ready.then, вычисляется некорректная высота элемента h2, поэтому, чтобы вычисления происходили наверняка после установки всех стилей - используется document.fonts.ready.then
    document.fonts.ready.then(() => {
      calcHeightTask({ refs, styleParamsTask, setStyleParamsTask })
    })
  }, [])

  useEffect(() => {
    // расчёт высоты параграфа Description
    if (refTask.current && refTextDescription.current && typeof styleParamsTask.closed.task.height === 'number') {
      calcHeightTask({ refs, styleParamsTask, setStyleParamsTask })
    }
  }, [wasClickedButtonDescription, data.nameTask, data.description])
}
