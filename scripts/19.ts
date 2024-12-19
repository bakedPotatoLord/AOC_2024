import { re } from 'mathjs'
import {dispMatrix, getInput, numberSum, convertSign,v2, vectorEquals,vec2} from './helpers'

const raw = (await getInput(19))
.split("\n\n")

const stripes = raw[0].split(", ")

const toMake = raw[1].split("\n")



// console.log(stripes,toMake)

let open = 0

let possible = 0
let allWays = 0


let memo = new Map<string,number>()


function checkPossible(left:string){
  // console.log(left)
  // if(left.length == 0) return true
  // let check = []
  // for(let stripe of stripes){
  //   if(left.startsWith(stripe)) check.push(left.slice(stripe.length))
  //   else continue
  // }
  // return check.map(l => checkPossible(l)).includes(true) 

  let q = [left]

  let visited= new Set<string>()
  let parentMap = new Map<string,string[]>()

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
          parentMap.set(rest,[next])}
      } 
    }
    visited.add(next)
    // console.log(q) 

  }
  // console.log(parentMap)
  // console.log(localPossible)
  if(localPossible > 0){
    possible++

    let a = decode(parentMap,left)
    console.log(a)
  }
  


}
let i = 0
let allCount = 0
for(let m of toMake){

  // console.log(i)
  checkPossible(m)
  // recurseCheckPossible(m)
  // console.log(i/toMake.length)
  // i++
}


function decode(parentMap:Map<string,string[]>,s:string){

  if(memo.has(s)) return memo.get(s)

  else{
    if(!parentMap.has(s)){
      return 0
    }
    return numberSum(parentMap.get(s).map(l => decode(parentMap,l)))
  }
}



console.log("part 1",possible)

console.log("part 2",allCount) 


