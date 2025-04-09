function increment(values: number[]) {
  if (values.every((value) => typeof value === 'number')) {
    return values.reduce((acc, value) => acc + value)
  }
}

export default increment
