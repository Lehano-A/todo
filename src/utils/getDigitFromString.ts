// получить значение числового типа из строки
function getDigitFromString(str: string) {
  const regexDigit = /\d/g
  return Number(str.match(regexDigit)?.join(''))
}

export default getDigitFromString
