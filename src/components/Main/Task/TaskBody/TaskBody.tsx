import styled from 'styled-components'

import { ReactComponent as IconArrowDown } from '../../../../images/icons/arrow-down.svg'
import { TaskControl } from '../../../../styled/buttons'
import ContentBox from './ContentBox/ContentBox'
import { TaskBodyProps } from './taskBody.types'

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

function TaskBody({
  data,
  refs,
  isOpenedContent,
  isDisabledButtonShowContent,
  wasToggledButtonShowContent,
  handleShowContent,
  styleTaskElements,
}: TaskBodyProps) {
  const { refTitle, refContentBox } = refs

  return (
    <>
      <Title ref={refTitle}>{data.nameTask}</Title>

      {data.description && (
        <>
          <ButtonShowContent
            $styleTaskElements={styleTaskElements} // прокидывается внутрь TaskControl
            disabled={isDisabledButtonShowContent}
            onClick={handleShowContent}
          >
            <StyledIconArrowDown $wasToggledButtonShowContent={wasToggledButtonShowContent} />
          </ButtonShowContent>

          <ContentBox
            wasToggledButtonShowContent={wasToggledButtonShowContent}
            isOpenedContent={isOpenedContent}
            refContentBox={refContentBox}
          >
            <Description>{data.description}</Description>
          </ContentBox>
        </>
      )}
    </>
  )
}

export default TaskBody
