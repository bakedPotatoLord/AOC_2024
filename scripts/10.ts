
import {dispMatrix, getInput, numberSum, } from './helpers'

type vec2 = [number, number]


const raw = (await getInput(10))
.split("\n")
.map(l => l.split(""))

const heads:vec2[] = []

for (let i = 0; i < raw.length; i++) {
  for (let j = 0; j < raw[i].length; j++) {
    if (raw[i][j] == "0") heads.push([i, j])
  }
}

function onMatrix(i, j) {
  return i >= 0 && j >= 0 && i < raw.length && j < raw[0].length
}

console.log(heads)

const dirs:vec2[] = [[0, 1], [0, -1], [1, 0], [-1, 0]]

let scoreSum = 0

for(let head of heads){
  let score = 0
  const q = [head]

  const seen = new Set<string>()

  while(q.length > 0){
    const next = q.shift()

    if(seen.has(next.join(","))) continue
    seen.add(next.join(","))

    if(Number(raw[next[0]][next[1]]) == 9){
      score++
    }

    const possible = dirs.map(d => vectorAdd(next, d))
    .filter(p => onMatrix(p[0], p[1]))
    .filter(p => raw[p[0]][p[1]] != ".")
    .filter(p => Number(raw[p[0]][p[1]]) == Number(raw[next[0]][next[1]]) + 1)

    q.push(...possible)
  }

  scoreSum += score
  break 
} 

console.log("part 1:", scoreSum) 

let ratingsum = 0

for(let head of heads){
  let rating = 0
  const q = [head] 

  while(q.length > 0){
    const next = q.shift()

    const dups = new Set<string>() // set of used pos-dir vector pairs

    if(Number(raw[next[0]][next[1]]) == 9){
      rating++
      continue
    }


    const nums = dirs.map(d => [...vectorAdd(next, d),...d])
    .filter(p => onMatrix(p[0], p[1]))
    .filter(p => raw[p[0]][p[1]] != ".")
    .filter(p => Number(raw[p[0]][p[1]]) == Number(raw[next[0]][next[1]]) + 1)


    // console.log(nums)

    for(let num of nums){
      if(dups.has(num.join(","))) continue
      dups.add(num.join(","))
      q.push(<vec2>num.slice(0, 2))
    }


    // q.push(...possible) 
  }

  console.log(head, rating)
  ratingsum += rating
} 

//1477

console.log("p2:",ratingsum)   

export function vectorAdd(v1:vec2,v2:vec2):vec2{
  return [v1[0]+v2[0],v1[1]+v2[1]]
}