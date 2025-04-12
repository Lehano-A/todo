import { useDispatch } from 'react-redux'

import { ALL_TASKS } from '../../constants'
import { ColumnName, add, remove } from '../../redux/reducers/slices/tasksSlice'
import ls from '../../utils/localStorage'
import { TaskType } from '../Main/Task/task.type'

function useActionsWithTasks() {
  const dispatch = useDispatch()

  function addNewTask(columnName: ColumnName, task: TaskType) {
    switch (columnName) {
      case 'todo':
        dispatch(add({ columnName, task }))
        ls.add(ALL_TASKS, columnName, task)
    }
  }

  // удалить задачу
  function removeTask(columnName: ColumnName, id: string) {
    switch (columnName) {
      case 'todo':
        dispatch(remove({ columnName, id }))
        ls.remove(ALL_TASKS, columnName, id)
    }
  }

  return { addNewTask, removeTask }
}

export default useActionsWithTasks
