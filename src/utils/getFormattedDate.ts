function getFormattedDate(dateInput: string) {
  const [year, month, day] = dateInput.split('-')
  return `${day}.${month}.${year}`
}

export default getFormattedDate
