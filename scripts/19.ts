import { re } from 'mathjs'
import {dispMatrix, getInput, numberSum, convertSign,v2, vectorEquals,vec2} from './helpers'

const raw = (await getInput(19))
.split("\n\n")

const stripes = raw[0].split(", ")
const toMake = raw[1].split("\n")

let possible = 0
let allWays = 0

function checkPossible(left:string){
  let q = [left]
  let visited= new Set<string>()

  // child, parent[]
  let parentMap = new Map<string,string[]>()

  // parent, child[]
  let childMap = new Map<string,string[]>()

  let localPossible = 0

  while(q.length > 0){
    const next = q.shift()
    if(visited.has(next)) continue
    if(next.length == 0){
      localPossible++
    }
    for(let stripe of stripes){
      if(next.startsWith(stripe)){
        const rest = next.slice(stripe.length)
        q.push(rest)
        if(parentMap.has(rest)){
          parentMap.get(rest).push(next)
        }else{
          parentMap.set(rest,[next])
        }
        if(childMap.has(next)){
          childMap.get(next).push(rest)
        }else{
          childMap.set(next,[rest])
        }
      }
    }
    visited.add(next)
  }

  if(localPossible > 0){
    possible++
    let memo = new Map<string,number>()
    allWays += numWays(left)

    function numWays(s:string){
      if(memo.has(s)) return memo.get(s)
      let m
      if(s == "") m=1
      else if(!childMap.has(s)) m = 0
      else m= childMap.get(s).map(c => numWays(c)).reduce((a,b) => a+b,0)

      memo.set(s,m)
      return m
    }
  }
}

for(let m of toMake){
  checkPossible(m)
}

console.log("part 1",possible)
console.log("part 2",allWays)
