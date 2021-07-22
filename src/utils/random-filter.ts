// select n random elements from an array
export function randomFilter<T> (arr: T[], n: number): T[] {
  const clone = [ ...arr ]
  const result: T[] = []
  for (let i = 0; i < n; i++) {
    const index = Math.floor(Math.random() * clone.length)
    result.push(clone[index]!)
    clone.splice(index, 1)
  }
  return result
}
