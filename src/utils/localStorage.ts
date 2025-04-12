import { TaskType, TasksType } from '../components/Main/Task/task.type'

const ls = {
  get: function (key: string) {
    return parsingDataFromLS(key)
  },

  add: function (key: string, columnName: string, value: TaskType) {
    const parsedData = parsingDataFromLS(key)

    // если данные внутри ЛХ это - массив
    if (parsedData?.todo) {
      parsedData.todo.push(value)
      localStorage.setItem(key, JSON.stringify(parsedData))
      return
    }

    if (!parsedData) initialLS(value)
  },

  updateColumns: function (data: { todo: TaskType[]; inProcess: TaskType[]; done: TaskType[] }) {
    localStorage.setItem('tasks', JSON.stringify(data))
  },

  remove: function (key: string, columnName: string, value: string) {
    const parsedData = parsingDataFromLS(key)

    // если данные внутри ЛХ это - массив
    if (Array.isArray(parsedData)) {
      const filtered = parsedData.filter((item) => item.id !== value)
      localStorage.setItem(key, JSON.stringify(filtered))
    }
  },
}

function initialLS(value: TaskType) {
  localStorage.setItem('tasks', JSON.stringify({ todo: [value], inProcess: [], done: [] }))
}

function parsingDataFromLS(key: string): TasksType | null {
  const data = localStorage.getItem(key)

  if (data) {
    return JSON.parse(data)
  }

  return null
}

export default ls
