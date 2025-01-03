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

let zbits = memo.entries().filter(([k,v])=>k.startsWith("z")).toArray()
.sort((a,b)=>parseInt(b[0].substring(1))-parseInt(a[0].substring(1)))
.map(([k,v])=>Number(v))
.join("")

console.log("p1:",parseInt(zbits,2))
