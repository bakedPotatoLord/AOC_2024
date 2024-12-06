import { getInput, numberSum } from './helpers'

const raw = (await getInput(1))
  .split("\n")
  .map(l => l.split("   "))

const left = raw.map(l => parseInt(l[0])).sort((a, b) => b - a)
const right = raw.map(l => parseInt(l[1])).sort((a, b) => b - a)

const diffs = right.map((r, i) => Math.abs(Number(r) - Number(left[i])))


console.log("part 1:", numberSum(diffs))


const occurs = new Map<number, number>()

right.forEach((r, i) => {
  if (occurs.has(r)) occurs.set(r, occurs.get(r) + 1)
  else occurs.set(r, 1)
})

const leftoccs = left.map(l => l * (occurs.get(l) ?? 0))

console.log(leftoccs)

console.log("part 2:", numberSum(leftoccs))