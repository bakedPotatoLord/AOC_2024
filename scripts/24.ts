import { parse } from 'mathjs'
import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2 } from './helpers'

const raw = (await getInput(24))
.split("\n\n")

const startVals = raw[0].split("\n")
.map(l=>l.split(": "))
.map((l) => <[string,boolean]>[l[0],Boolean(Number(l[1]))])

const rules = raw[1].split("\n")
.map(l=>l.split(/ -> | /))



let ruleMap = new Map<string,string[]>(rules.map(([a,op,b,res])=>[res,[a,op,b]]))


let memo = new Map<string,boolean>(startVals)

// console.log(memo,ruleMap)

for(let gate of ruleMap.keys()){
  rec(gate)

}

function rec(gate:string){
  if(memo.has(gate)) return memo.get(gate)
  let [a,op,b] = ruleMap.get(gate)
  if(op == "OR"){
    let res = rec(a) || rec(b)
    memo.set(gate,res)
    return res
  }else if(op == "AND"){
    let res = rec(a) && rec(b)
    memo.set(gate,res)
    return res
  }else if(op == "XOR"){
    let res = rec(a) !== rec(b)
    memo.set(gate,res)
    return res
  }
}

// console.log(memo)

function getNum(startChar:string){
  let bits = Array.from(memo.entries())
  .filter(([k,v])=>k.startsWith(startChar))
  .sort((a,b)=>parseInt(b[0].substring(1))-parseInt(a[0].substring(1)))
  .map(([k,v])=>Number(v))
  .join("")

  return parseInt(bits,2)
}

let z = getNum("z")
console.log("p1:",z)

let x = getNum("x")
let y = getNum("y")

let sum = x+y

console.log(z.toString(2),"z")
console.log(sum.toString(2),"x+y")

console.log((z^sum).toString(2),"z^x+y")

//313-92 = 221 gates

// two gate swaps
//first swap has 221*220  = 48620 possible swaps
// second swap has 219*218 = 47742 possible swaps

// total = 48620*47742 = 2_321_216_040 
// I'd have to run the simulation 2 billion times.

//not feasable on my device
//gonna need to try a different approach.


//thinking something along the lines of: 
//work back from the incorrect bits, 
//and find the gates that only affect incorrect bits

//not sure what to do with the data that that will give me
// mabye I make a map of which gates affect which bits
