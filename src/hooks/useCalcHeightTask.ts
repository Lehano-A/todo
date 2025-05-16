import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { TaskElementsRefs, TaskProps } from '../components/Main/Task/task.types'
import { CalсHeightTask, calcHeightTask } from '../components/Main/Task/utils/calcHeightTask'
import { RootState } from '../redux/store'

interface UseCalcHeightTaskProps {
  data: TaskProps['data']
  refs: TaskElementsRefs
  styleParamsTask: CalсHeightTask['styleParamsTask']
  setStyleParamsTask: CalсHeightTask['setStyleParamsTask']
  wasToggledButtonShowContent: boolean
}

export function useCalcHeightTask({
  data,
  refs,
  styleParamsTask,
  setStyleParamsTask,
  wasToggledButtonShowContent,
}: UseCalcHeightTaskProps) {
  const { refTask, refContentBox } = refs

  const didWindowResize = useSelector((state: RootState) => state.common.didWindowResize)

  useEffect(() => {
    // после монтирования компонента, без document.fonts.ready.then, вычисляется некорректная высота элемента h2, поэтому, чтобы вычисления происходили наверняка после установки всех стилей - используется document.fonts.ready.then
    document.fonts.ready.then(() => {
      calcHeightTask({ refs, styleParamsTask, setStyleParamsTask })
    })
  }, [])

  useEffect(() => {
    // расчёт высоты ContentBox
    if (refTask.current && refContentBox.current && typeof styleParamsTask.closed.task.height === 'number') {
      calcHeightTask({ refs, styleParamsTask, setStyleParamsTask })
    }
  }, [wasToggledButtonShowContent, data.nameTask, data.description, didWindowResize])
}
