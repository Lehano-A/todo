import { DefaultTheme } from 'styled-components'

import { StyleTaskElements } from '../task.types'
import { RestOfDays } from './calcRestOfDaysBeforeDeadline'

interface DefaultStyle {
  red: string
  green: string
  grey: string
}

interface ExpiredStyle {
  defaultStyle: StyleTaskElements
  grey: string
}

interface HighDeadlineStyle {
  defaultStyle: StyleTaskElements
  red: string
}

interface MidDeadlineStyle extends HighDeadlineStyle {}
interface LowDeadlineStyle extends HighDeadlineStyle {}

const getDefaultStyle = ({ red, green, grey }: DefaultStyle): StyleTaskElements => ({
  bg: '#fff',
  deadline: { bg: { main: red[900], done: green[500] } },
  control: { fill: grey[500], hover: grey[300] },
})

const getExpiredStyle = ({ defaultStyle, grey }: ExpiredStyle): StyleTaskElements => ({
  bg: grey[300],
  deadline: { bg: { ...defaultStyle.deadline.bg, main: grey[700] } },
  control: { ...defaultStyle.control, hover: grey[700] },
})

const getHighDeadlineStyle = ({ defaultStyle, red }: HighDeadlineStyle): StyleTaskElements => ({
  bg: red[100],
  deadline: defaultStyle.deadline,
  control: { fill: red[300], hover: red[950] },
})

const getMidDeadlineStyle = ({ defaultStyle, red }: MidDeadlineStyle): StyleTaskElements => ({
  bg: red[300],
  deadline: defaultStyle.deadline,
  control: { fill: red[900], hover: red[150] },
})

const getLowDeadlineStyle = ({ defaultStyle, red }: LowDeadlineStyle): StyleTaskElements => ({
  bg: red[900],
  deadline: defaultStyle.deadline,
  control: { fill: red[200], hover: red[75] },
})

// получить цвета элементов задачи
export function getColorsTaskElements(
  theme: DefaultTheme,
  restOfDays: RestOfDays,
  isTaskDone: boolean
): StyleTaskElements {
  const green = theme.palette.green
  const red = theme.palette.red
  const grey = theme.palette.grey

  const defaultStyle = getDefaultStyle({ red, green, grey })

  // если задача в колонке 'done'
  if (isTaskDone) {
    return defaultStyle
  }

  if (restOfDays) {
    // просрочено
    if (restOfDays < 0) {
      return getExpiredStyle({ defaultStyle, grey })
    }

    // от 5 до 7 включительно
    if (restOfDays >= 5 && restOfDays <= 7) {
      return getHighDeadlineStyle({ defaultStyle, red })
    }

    // от 3 до 5 включительно
    if (restOfDays >= 3 && restOfDays <= 5) {
      return getMidDeadlineStyle({ defaultStyle, red })
    }

    // от 1 до 3 включительно
    if (restOfDays <= 3 && restOfDays >= 0) {
      return getLowDeadlineStyle({ defaultStyle, red })
    }
  }

  return defaultStyle
}
