import {getInput, numberSum, vectorEquals, } from './helpers'

type vec2 = [number, number]

import  * as math from 'mathjs'

const raw = (await getInput(13))
.split("\n\n")
.map(l => l.split("\n")
  .map(sl=>sl.split(/,|\:\ |\=|\+/))
  .map((a)=><vec2>[Number(a[2]),Number(a[4])])
)

// console.log(raw)

const raw2  = structuredClone(raw)

for(let l of raw2){
  l[2] = <vec2>l[2].map(n=>n+10_000_000_000_000)
}


let tokens = []

for(let nums of raw){ 
  const coefficients = [[nums[0][0], nums[1][0]], [nums[0][1], nums[1][1]]];
  const constants = nums[2];

  const solution = math.lusolve(coefficients, constants);
  const parsedSolution = solution.toString().split(",").map(n=>Number(n)).map(n=>nearInt(n) ? Math.round(n) : NaN)
  if(parsedSolution.includes(NaN)) continue
  tokens.push(parsedSolution)
}

function nearInt(n: number) { 
  return Math.abs(Math.round(n) - n )< 0.0001 ;
}

const costs2 = tokens.map(t => t[0]*3 + t[1])

console.log("part 1:",numberSum(costs2)) 

//a button costs 3
//b button costs 1

tokens = []

for(let nums of raw2){ 
  const coefficients = [[nums[0][0], nums[1][0]], [nums[0][1], nums[1][1]]];
  const constants = nums[2];

  
  const solution = math.lusolve(coefficients, constants);
  const parsedSolution = solution.toString().split(",").map(n=>Number(n)).map(n=>nearInt(n) ? Math.round(n) : NaN)
  if(parsedSolution.includes(NaN)) continue
  tokens.push(parsedSolution)
  // console.log(parsedSolution ) ; 
}

const costs = tokens.map(t => t[0]*3 + t[1])

console.log("part 2:",numberSum(costs))  
