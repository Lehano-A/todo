import { DefaultTheme } from 'styled-components'

import { RestOfDays } from './calculateRestOfDaysBeforeDeadline'

// получить цвета элементов задачи
export function getColorsTaskElements(theme: DefaultTheme, restOfDays: RestOfDays) {
  const white = '#fff'
  const red = theme.palette.red
  const grey = theme.palette.grey

  const defaultStyle = {
    bg: white,
    deadline: { bg: red[900] },
    control: { fill: grey[500], hover: grey[300] },
  }

  // нет дедлайна или больше 7
  if (restOfDays === undefined || restOfDays > 7) {
    return defaultStyle
  }

  // просрочено
  if (restOfDays <= 0) {
    return {
      bg: grey[300],
      deadline: { bg: grey[700] },
      control: { fill: grey[500], hover: grey[700] },
    }
  }

  // от 5 до 7 включительно
  if (restOfDays >= 5 && restOfDays <= 7) {
    return {
      bg: red[100],
      deadline: { bg: red[900] },
      control: { fill: red[300], hover: red[950] },
    }
  }

  // от 3 до 5 включительно
  if (restOfDays >= 3 && restOfDays <= 5) {
    return {
      bg: red[300],
      deadline: { bg: red[900] },
      control: { fill: red[900], hover: red[150] },
    }
  }

  // от 1 до 3 включительно
  if (restOfDays <= 3 && restOfDays >= 1) {
    return {
      bg: red[900],
      deadline: { bg: red[900] },
      control: { fill: red[200], hover: red[75] },
    }
  }

  return defaultStyle
}
