import getDigitFromString from './getDigitFromString'

// получить стилевое значение
function getStyleValue(ref: React.RefObject<HTMLElement>, cssKey: string): string | number | null {
  if (ref.current) {
    const value = window.getComputedStyle(ref.current).getPropertyValue(cssKey)
    const regexDigit = /\d/g
    if (regexDigit.test(value)) {
      return getDigitFromString(value) // возвращает число
    }

    return value // возвращает строку (например: 'absolute')
  }

  return null // если нет ссылки на элемент
}

export default getStyleValue
