export type RestOfDays = number | undefined

// рассчитать остаток дней до дедлайна выполнения задачи
export function calcRestOfDaysBeforeDeadline(deadline: string): RestOfDays {
  if (deadline === '') {
    return
  }

  const [day, month, year] = deadline.split('.')

  const deadlineDate: Date = new Date(`${month}/${day}/${year}`) // переведом в понятный для Date формат (05/11/2025)

  const currentDate: Date = new Date()

  const diffInMs = deadlineDate.getTime() - currentDate.getTime() // разница в миллисекундах

  // переводим миллисекунды в дни
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1 // +1 - включая день дедлайна
}
