import { pluralize } from 'numeralize-ru'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import { DeadlineProps, StyledDeadlineProps } from './deadline.types'

const DeadlineBox = styled('div')`
  position: absolute;
  top: 1px; /* 1px, а не 0 - т.к. при открытии TextDescription, начинает мерцать нижняя граница во время анимации */
  display: flex;
  gap: 3px;
`

const StyledDeadline = styled('time')<StyledDeadlineProps>`
  padding: 5px;
  color: #fff;
  font-size: 1.3rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background: ${({ $styleTaskElements, $isTaskDone, $isExpired }) => {
    if ($isExpired) {
      return $styleTaskElements.deadline.bg.main
    }

    if ($isTaskDone) {
      return $styleTaskElements.deadline.bg.done
    }

    return $styleTaskElements.deadline.bg.main
  }};
`

const RestOfDays = styled('time')`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.palette.error.dark};
`

function Deadline({ data, restOfDays, isTaskDone, currentColumnLocation, styleTaskElements }: DeadlineProps) {
  const isExpired = Boolean(restOfDays && restOfDays <= 0)

  // остаток дней до дедлайна
  const restOfDaysBeforeDeadline = useMemo(() => {
    const caseText = pluralize(Number(restOfDays), 'день', 'дня', 'дней')

    return `${restOfDays} ${caseText}`
  }, [restOfDays])

  const textDeadline = useMemo(() => {
    // если непросрочено и задача находится не в колонке 'Done'
    if (!isExpired && !isTaskDone) {
      return `выполнить до ${data.deadline}`
    }

    // если просрочено
    if (isExpired) {
      return 'просрочено'
    }

    // если в колонке 'Done'
    if (isTaskDone) {
      return `выполнено`
    }
  }, [currentColumnLocation, data.deadline])

  return (
    <DeadlineBox>
      <StyledDeadline
        $styleTaskElements={styleTaskElements}
        $isTaskDone={isTaskDone}
        $isExpired={isExpired}
      >
        {textDeadline}
      </StyledDeadline>

      {!isTaskDone && <RestOfDays>{restOfDaysBeforeDeadline}</RestOfDays>}
    </DeadlineBox>
  )
}

export default Deadline
