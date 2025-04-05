const ls = {
  get: function (key: string) {
    return parsingDataFromLS<string>(key)
  },

  add: function (key: string, value: any) {
    const parsedData = parsingDataFromLS<string>(key)

    // если данные внутри ЛХ это - массив
    if (Array.isArray(parsedData)) {
      parsedData.push(value)
      localStorage.setItem(key, JSON.stringify(parsedData))
      return
    }

    if (!parsedData) localStorage.setItem(key, JSON.stringify([value]))
  },

  remove: function (key: string, value: string) {
    const parsedData = parsingDataFromLS<string>(key)

    // если данные внутри ЛХ это - массив
    if (Array.isArray(parsedData)) {
      const filtered = parsedData.filter((item) => item.id !== value)
      localStorage.setItem(key, JSON.stringify(filtered))
    }
  },
}

function parsingDataFromLS<T>(key: string): T | null {
  const data = localStorage.getItem(key)

  if (data) {
    return JSON.parse(data)
  }

  return null
}

export default ls
