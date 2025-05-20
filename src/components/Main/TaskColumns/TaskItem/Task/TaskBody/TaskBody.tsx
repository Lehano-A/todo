import { useContext } from 'react'
import styled from 'styled-components'

import { TaskBodyContext } from '../../../../../../contexts/TaskBodyContext'
import { TaskItemContext } from '../../../../../../contexts/TaskItemContext'
import { ReactComponent as IconArrowDown } from '../../../../../../images/icons/arrow-down.svg'
import { TaskControl } from '../../../../../../styled/buttons'
import { TaskElementsRefs } from '../task.types'
import ContentBox from './ContentBox/ContentBox'

const StyledIconArrowDown = styled(IconArrowDown)`
  transform: ${({ $wasToggledButtonShowContent }) => $wasToggledButtonShowContent && 'rotate(180deg)'};
  transition: transform 0.3s ease;
`

const Title = styled('h2')`
  font-size: 1.4rem;
  font-weight: 600;
`

const ButtonShowContent = styled(TaskControl)`
  position: absolute;
  left: 50%;
  bottom: 2px; // 2px - чтобы была видна нижняя часть фокуса
  transform: translateX(-50%);
  width: 50px;
  height: 25px;
`

const Description = styled('p')`
  display: flex;
  width: 100%;
  font-size: 1.4rem;
  margin: 25px 0 0;
`

interface TaskBodyProps {
  refs: TaskElementsRefs
}

function TaskBody({ refs }: TaskBodyProps) {
  const { refTitle } = refs

  const { dataTask } = useContext(TaskItemContext)
  const { nameTask, description } = dataTask

  const { isDisabledButtonShowContent, wasToggledButtonShowContent, styleTaskElements, handleShowContent } =
    useContext(TaskBodyContext)

  return (
    <>
      <Title ref={refTitle}>{nameTask}</Title>

      {description && (
        <>
          <ButtonShowContent
            $styleTaskElements={styleTaskElements} // прокидывается внутрь TaskControl
            disabled={isDisabledButtonShowContent}
            onClick={handleShowContent}
          >
            <StyledIconArrowDown $wasToggledButtonShowContent={wasToggledButtonShowContent} />
          </ButtonShowContent>

          <ContentBox refs={refs}>
            <Description>{description}</Description>
          </ContentBox>
        </>
      )}
    </>
  )
}

export default TaskBody
