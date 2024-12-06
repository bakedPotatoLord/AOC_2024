import { getInput, numberSum } from './helpers'

const raw = (await getInput(2))
  .split("\n")
  .map(l => l.split(" ").map(Number))

const valid = raw.filter(row => increase(row) || decrease(row))

function increase(arr: any[]) {

  for (let i = 0; i < arr.length - 1; i++) {
    const diff = Math.abs(arr[i] - arr[i + 1])
    if (arr[i] < arr[i + 1] && (diff >= 1 && diff <= 3)) continue
    return false
  }
  return true
}

function decrease(arr: any[]) {
  for (let i = 0; i < arr.length - 1; i++) {
    const diff = Math.abs(arr[i] - arr[i + 1])
    if (arr[i] > arr[i + 1] && (diff >= 1 && diff <= 3)) { }
    else return false
  }
  return true
}

console.log("part 1:", valid.length)

let possible = 0

for (let i = 0; i < raw.length; i++) {
  const row = raw[i]
  let a = Array(row.length).fill(0).map((_, i) => structuredClone(row))
  a.forEach((r, i) => {
    r.splice(i, 1)
  })

  if (a.filter(row => increase(row) || decrease(row)).length > 0) possible++
}



console.log("part 2:", possible)  
