import { getInput, numberSum } from './helpers'

const raw = (await getInput(5))

const rules = raw.split("\n\n")[0].split("\n")
  .map(l => l.split("|").map(e => Number(e)))

const ruleMap = new Map<number, Set<number>>()

rules.forEach(([f, s]) => {
  if (ruleMap.has(f)) {
    ruleMap.get(f).add(s)
  } else {
    ruleMap.set(f, new Set([s]))
  }
})

const pages = raw.split("\n\n")[1].split("\n")
  .map(l => l.split(",").map(Number))

const incorrect = []

let seen: number[] = []
let valid = pages.map(p => {
  seen = []

  for (let item of p) {
    seen.push(item)
    if (!ruleMap.has(item)) continue

    if (numbersInSet(seen, ruleMap.get(item))) {
      incorrect.push(p)
      return 0
    }
  }
  return p.at(Math.floor(p.length / 2))

})

function numbersInSet(nums: number[], set: Set<number>) {
  for (let num of nums) {
    if (set.has(num)) return true
  }
  return false
}

console.log("part 1:", numberSum(valid))

incorrect.forEach(l => {
  for (let i = 0; i < l.length; i++) {
    if (!ruleMap.has(l[i])) continue
    if (!ruleMap.get(l[i]).has(l[i + 1])) return
  }
})

function TryingSort(arr: number[]) {
  const ordered = []
  while (arr.length > 0) {
    const noDeps = arr.filter(num => {
      return (!ruleMap.has(num) || !numbersInSet(arr, ruleMap.get(num)))
    })
    ordered.unshift(...noDeps)
    arr = arr.filter(num => !noDeps.includes(num))
  }
  return ordered
}

const fixed = incorrect.map(e => TryingSort(e))
const medians = fixed.map(e => e[Math.floor(e.length / 2)])
console.log("part 2", numberSum(medians))

