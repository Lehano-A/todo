import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { getTasksFromLS, updateAfterDrag } from '../../redux/reducers/slices/tasksSlice'
import { RootState } from '../../redux/store'
import FormNewTask from '../FormNewTask/FormNewTask'
import Done from './Columns/Done/Done'
import InProcess from './Columns/InProcess/InProcess'
import Todo from './Columns/Todo/Todo'
import { TasksType } from './Task/task.type'

const StyledMain = styled('main')`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Columns = styled('section')`
  display: flex;
  justify-content: center;
  width: 100%;

  :where(& > :nth-child(1n):not(:last-child)) {
    margin-right: 20px;
  }
`

function Main() {
  const refFormAddTask = useRef(null)
  const dispatch = useDispatch()

  const tasks = useSelector((state: RootState) => state.tasks)
  const isActiveFormAddTask = useSelector((state: RootState) => state.formNewTask.isActive)
  const [wasDrop, setWasDrop] = useState<boolean | null>(null)

  useEffect(() => {
    if (wasDrop === null || wasDrop) {
      dispatch(getTasksFromLS())
      setWasDrop(false)
    }
  }, [wasDrop])

  // обработать drop (DnD) перемещения задачи
  function handleOnDragEnd(result: DropResult) {
    const { source, destination } = result

    const columnFrom = source.droppableId
    const columnWhere = destination?.droppableId

    if (destination) {
      const idPlaceFrom = source.index
      const idPlaceWhere = destination.index
      const elFrom = tasks[columnFrom as keyof TasksType][idPlaceFrom]

      const copyTasks = JSON.parse(JSON.stringify(tasks))
      copyTasks[columnFrom as keyof TasksType].splice(idPlaceFrom, 1) // удаляем переносимый элемент
      copyTasks[columnWhere as keyof TasksType].splice(idPlaceWhere, 0, elFrom) // вставляем переносимый элемент в выбранное место

      dispatch(updateAfterDrag({ tasks: copyTasks }))
      setWasDrop(true)
    }
  }

  return (
    <StyledMain>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Columns>
          <Todo refFormAddTask={refFormAddTask} />
          <InProcess />
          <Done />
        </Columns>
      </DragDropContext>

      {isActiveFormAddTask && <FormNewTask ref={refFormAddTask} />}
    </StyledMain>
  )
}

export default Main
