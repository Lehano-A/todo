import { useDispatch } from 'react-redux'

import { TODO_TASKS } from '../../constants'
import { addNewTaskInToDo, removeTaskFromToDo } from '../../redux/reducers/slices/todoTasksSlice'
import ls from '../../utils/localStorage'
import { TaskType } from '../Main/Task/task.type'

function useActionsWithTasks() {
  const dispatch = useDispatch()

  function addNewTask(nameColumn: string, task: TaskType) {
    switch (nameColumn) {
      case TODO_TASKS:
        dispatch(addNewTaskInToDo(task))
        ls.add(TODO_TASKS, task)
    }
  }

  // удалить задачу
  function removeTask(nameColumn: string, id: string) {
    switch (nameColumn) {
      case TODO_TASKS:
        dispatch(removeTaskFromToDo(id))
        ls.remove(TODO_TASKS, id)
    }
  }

  return { addNewTask, removeTask }
}

export default useActionsWithTasks
