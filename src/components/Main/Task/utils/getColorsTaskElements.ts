import { DefaultTheme } from 'styled-components'

import { StyleTaskElements } from '../task.types'
import { RestOfDays } from './calculateRestOfDaysBeforeDeadline'

// получить цвета элементов задачи
export function getColorsTaskElements(
  theme: DefaultTheme,
  restOfDays: RestOfDays,
  isTaskDone: boolean
): StyleTaskElements {
  const white = '#fff'
  const green = theme.palette.green
  const red = theme.palette.red
  const grey = theme.palette.grey

  const defaultStyle = {
    bg: white,
    deadline: { bg: { main: red[900], done: green[500] } },
    control: { fill: grey[500], hover: grey[300] },
  }

  // если задача в колонке 'done'
  if (isTaskDone) {
    return defaultStyle
  }

  if (restOfDays) {
    // просрочено
    if (restOfDays < 0) {
      return {
        bg: grey[300],
        deadline: { bg: { ...defaultStyle.deadline.bg, main: grey[700] } },
        control: { ...defaultStyle.control, hover: grey[700] },
      }
    }

    // от 5 до 7 включительно
    if (restOfDays >= 5 && restOfDays <= 7) {
      return {
        bg: red[100],
        deadline: defaultStyle.deadline,
        control: { fill: red[300], hover: red[950] },
      }
    }

    // от 3 до 5 включительно
    if (restOfDays >= 3 && restOfDays <= 5) {
      return {
        bg: red[300],
        deadline: defaultStyle.deadline,
        control: { fill: red[900], hover: red[150] },
      }
    }

    // от 1 до 3 включительно
    if (restOfDays <= 3 && restOfDays >= 0) {
      return {
        bg: red[900],
        deadline: defaultStyle.deadline,
        control: { fill: red[200], hover: red[75] },
      }
    }
  }

  return defaultStyle
}
