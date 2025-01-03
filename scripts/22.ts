import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2 } from './helpers'

const now = Date.now()

const raw = (await getInput(22))
  .split("\n")
  .map(Number)


function next(i: bigint) {
  const mul = i << 6n
  i = (i ^ mul) % 16777216n
  const div = i >> 5n
  i = (i ^ div) % 16777216n
  const mul2 = i << 11n
  i = (i ^ mul2) % 16777216n
  return i
}

function calcAfter(reps: number, start: number) {
  let b = BigInt(start)
  let a: number[] = [start]
  for (let i = 0; i < reps; i++) {
    b = next(b)
    a.push(Number(b))
  }
  return a
}

let vals = raw.map(n => calcAfter(2000, n))
const p1 = Date.now()
console.log("part 1", Number(vals.reduce((a, b) => a + b[0], 0)))


let numArrays = structuredClone(vals)
for (let l of numArrays) {
  for (let i = 0; i < l.length; i++) {
    l[i] = l[i] % 10
  }
}

let possibleChars = ["-9", "-8", "-7", "-6", "-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

let possible: string[] = []

function rec(str: string[]) {
  // console.log(str)
  if (str.length == 4) possible.push(str.join(""))
  else {
    for (let c of possibleChars) {
      rec([...str, c])
    }
  }
}
rec([])
// console.log(possible.length)

// to brute force this problem:
// 19^4 = 130321 possible sequences 
// 2000 sequences to check against
// 2407 monkeys to check against

// 627_365_294_000
// 6 hundred billion comparisons
// hell no. not happening.
// might be possible to grind out in a couple of hours, but I'm better than this


function checkSequence(arr: number[]) {

  //sequence => value
  let map = new Map<string, number>()

  for (let i = 4; i < 2000; i++) {
    let prev = arr.slice(i - 5, i)
    let val = prev.at(-1)
    let diffs = ""
    for (let j = 1; j < prev.length; j++) diffs += (prev[j] - prev[j - 1]).toString() 

    if (map.has(diffs)) continue
    else map.set(diffs, val)

  }
  return map
}

let sequenceMaps : Map<string, number>[] = []

for (let arr of numArrays) {
  let map = checkSequence(arr)
  sequenceMaps.push(map)
  // console.log(map)
  // console.log(map.get("-1-102"))
}


// new logic
// 19^4 = 130321 possible sequences 
// 2407 monkeys to check against
// sequences are memoized into hashes

// 313_682_647
// 3 hundred million comparisons
// thats more like it

let max = 0
// let maxStr = ""

for(let [i,p] of possible.entries()){
  if(i%1000 == 0) console.log((i/possible.length).toFixed(2))
  let acc = 0
  for(let map of sequenceMaps){
    if(map.has(p)){
      acc += map.get(p)
    }
  }
  if(acc > max){
    max = acc
    // maxStr = p
  }
}


const p2 = Date.now()

console.log("part 2", max) 
//part two took 53.222 secs on my i5 12600k 4.5ghz, running bun

console.log("time to solve p1:", (p1 - now)*1e-3,"s")
console.log("time to solve p2:", (p2 - p1)*1e-3,"s")