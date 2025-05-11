import { TasksType } from '../components/Main/Task/task.types'
import { ALL_TASKS } from '../constants'

const ls = {
  getAllTasks: function () {
    return parsingDataFromLS(ALL_TASKS)
  },

  saveTasks: function (newData: TasksType) {
    localStorage.setItem(ALL_TASKS, JSON.stringify(newData))
  },
}

function parsingDataFromLS(key: string): TasksType | null {
  const data = localStorage.getItem(key)

  if (data) {
    return JSON.parse(data)
  }

  return null
}

export default ls
