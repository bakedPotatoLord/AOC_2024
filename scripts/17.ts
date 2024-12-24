import {dispMatrix, getInput, numberSum, convertSign,v2, vectorEquals,vec2} from './helpers'

const raw = (await getInput(17))
.split("\n\n")

let regs = <[number,number,number]>raw[0].split("\n")
.map(l => l.split(": "))
.map((l) => Number(l[1]))


const instructions = raw[1].split(": ")[1].split(",")
.map(n=>Number(n))

const partialInstructions = new Set<string>([""])

for(let i = 0; i < instructions.length; i++){
  partialInstructions.add(instructions.slice(0,i+1).join(","))
}

const completeInstructions = instructions.join(",")

console.log(partialInstructions)

// console.log(regs,instructions)

let outValidity = new Map<string,boolean>()

let longestOut = 0
let l0 = ""

let requiredOutLength = completeInstructions.length

let memo = new Map<string, [number,number,number,number, string,]>()


function performInst(ip:number,a:number,b:number,c:number,out:string,p2:boolean){

  if(p2){
    if(outValidity.has(out)){
      if(!outValidity.get(out)) {// if output is invalid, return
        // console.log("invalid",out)
        return false
      } 
    }else{
      const valid = partialInstructions.has(out)
      outValidity.set(out,valid)
      if(!valid){
        // console.log("invalid",out)
        return false
      } 
    }
    // console.log("valid",out)
    if(out == completeInstructions) return true // if output is complete
  
    if(out.length > longestOut){
      longestOut = out.length
      l0 = out
    }
  
  }
  
  if( ip+1 >= instructions.length) return false

  // console.log(ip,a,b,c,"out",out)

  const hash = [ip,regs[0],regs[1],regs[2],out].join(",")
  const inst = instructions[ip]
  const op = instructions[ip+1]
  
  const cop = getOperand(op)

  function getOperand(num:number){
    if(num < 4) return num
    else if(num == 4) return a
    else if(num == 5 ) return b
    else if(num == 6 ) return c
  }

  if(inst == 0){
    regs[0] = Math.floor(regs[0]/(2**cop))
  }else if(inst == 1){
    regs[1] = regs[1] ^ op
  }else if(inst == 2){
    regs[1] = cop % 8
  }else if(inst == 3){
    if(regs[0] != 0) ip = op-2
  }else if(inst == 4){
    regs[1] = regs[1] ^ regs[2]
  }else if(inst == 5){
     out += (out == "") ? (cop%8) :  "," +(cop%8)
  }else if(inst == 6){
    regs[1] = Math.floor(regs[0]/(2**cop))
  }else if(inst == 7){
    regs[2] = Math.floor(regs[0]/(2**cop))
  } 
  

  if(!memo.has(hash)){
    memo.set(hash,[ip+2,regs[0],regs[1],regs[2],out])
  }else{
    return performInst(...memo.get(hash),p2)
  }
  return performInst(ip+2,regs[0],regs[1],regs[2],out,p2)
}

console.log("part 1:",performInst(0,regs[0],regs[1],regs[2],"",false))


let aval = 0

while(aval < 10e9){
  let out = performInst(0,aval,0,0,"",true)
  if(aval%1e7 == 0){
    console.log(aval,longestOut,l0)

  }
   if(out){
     console.log("part 2:",aval)
     break
   }

  aval+= 2
}

