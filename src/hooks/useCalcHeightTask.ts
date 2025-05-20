import { useEffect } from 'react'

import { TaskElementsRefs, TaskProps } from '../components/Main/TaskColumns/TaskItem/Task/task.types'
import { CalсHeightTask, calcHeightTask } from '../components/Main/TaskColumns/TaskItem/Task/utils/calcHeightTask'

interface UseCalcHeightTaskProps {
  dataTask: TaskProps['data']
  refs: TaskElementsRefs
  styleParamsTask: CalсHeightTask['styleParamsTask']
  setStyleParamsTask: CalсHeightTask['setStyleParamsTask']
  wasToggledButtonShowContent: boolean
}

export function useCalcHeightTask({
  dataTask,
  refs,
  styleParamsTask,
  setStyleParamsTask,
  wasToggledButtonShowContent,
}: UseCalcHeightTaskProps) {
  const { refTask, refTitle, refContentBox } = refs

  const titleClientHeight = refTitle?.current?.clientHeight
  const contentBoxClientHeight = refContentBox?.current?.clientHeight

  useEffect(() => {
    // после монтирования компонента, без document.fonts.ready.then, вычисляется некорректная высота элемента h2, поэтому, чтобы вычисления происходили наверняка после установки всех стилей - используется document.fonts.ready.then
    document.fonts.ready.then(() => {
      calcHeightTask({ refs, styleParamsTask, setStyleParamsTask })
    })
  }, [])

  useEffect(() => {
    // расчёт высоты ContentBox
    if (refTask?.current && refContentBox?.current && typeof styleParamsTask.closed.task.height === 'number') {
      calcHeightTask({ refs, styleParamsTask, setStyleParamsTask })
    }
  }, [wasToggledButtonShowContent, dataTask.nameTask, dataTask.description, titleClientHeight, contentBoxClientHeight])
}
