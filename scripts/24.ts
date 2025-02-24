import { parse } from 'mathjs'
import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2 } from './helpers'
import Logic from "logic-solver"

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


//I can represent this as a system of equations


//variable for if every bit is swapped (unknown)
//variable for every starting x and y
//variable for every z, z=x+y
//variable for every gate (non x,y,z), equal to output of bits above it
//swap variable for every combination, 
//output variable equal to gate var, except if swapped for something else


//no 2 swaps can contain the same variable
//exactly 4 swaps must be made


let s = new Logic.Solver();

// console.log(s)


//add x and y vars
for(let [key,val] of startVals){

  s.require(Logic.equiv(key,val? Logic.TRUE: Logic.FALSE));
  // console.log(key,val? Logic.TRUE: Logic.FALSE)
}

// get switch vars

let nodes = Array.from(memo.keys())
let switchable: [string,[string,string]][] = []

for(let i = 0; i < nodes.length; i++){
  for(let j = i+1; j < nodes.length; j++){
    if(nodes[i].startsWith("x") || nodes[i].startsWith("y")|| nodes[j].startsWith("x") || nodes[j].startsWith("y")) continue
    // console.log(nodes[i],nodes[j])
    const str = `switch_${nodes[i]}_${nodes[j]}`
    switchable.push([str,[nodes[i],nodes[j]]])
  }
}


for(let i = 0; i < switchable.length; i++){
  for(let j=i+1;j<switchable.length;j++){
    const [s1,[a1,b1]] = switchable[i]
    const [s2,[a2,b2]] = switchable[j]
    if(a1 == a2 || b1 == b2 || a1 == b2 || b1 == a2){ //if any switches overlap
      s.require(Logic.not(Logic.and(s1,s2))) // dissalow both of them at the same time
    }
  }
}

const switchSum = Logic.sum(4,switchable.map(([s])=>s))
const four = Logic.constantBits(3)

//require exactly 4 swaps
// s.require(Logic.equalBits(switchSum,four))


for(let [name,[a,op,b]] of ruleMap.entries()){

  const internalName = `internal_${name}`
  // console.log("hi",name,a,op,b)

  if(op == "OR"){
    s.require(Logic.equiv(internalName,Logic.or(a,b)))
  }else if(op == "AND"){
    s.require(Logic.equiv(internalName,Logic.and(a,b)))
  }else if(op == "XOR"){
    s.require(Logic.equiv(internalName,Logic.xor(a,b)))
  }
  
  const possibleSwitches:string[] = []
  for(let [sw,[a1,b1]] of switchable){ // for all switchable
    if(name ==a1){// if this gate involved in switch  with other
      // console.log(name,a1,b1,sw)
      possibleSwitches.push(sw)
      s.require(Logic.implies(sw,Logic.equiv(name,`internal_${b1}`))) //if switched with a different gate, output internal gate of other gate
    }
    

  }

  //otherwise, output internal gate
  // s.require(Logic.implies(Logic.not(Logic.or(...possibleSwitches)),Logic.equiv(name,internalName)))

}


//apply x-y-z rules

 const nodeNums =nodes.filter(l=>l.startsWith("z")).map(l=>l.substring(1))

 for(let n of nodeNums){
   s.require(Logic.equiv(`z${n}`,Logic.and(`x${n}`,`y${n}`)))
 }


let solution = s.solve().getMap()

console.log(solution)

// z0 = 0
// z1 = 0
// z2 = 0
// z3 = 1
// z4 = 0
// z5 = 1
