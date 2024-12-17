import {dispMatrix, getInput, numberSum, convertSign,v2, vectorEquals,vec2} from './helpers'

const raw = (await getInput(17))
.split("\n\n")

let regs = <[number,number,number]>raw[0].split("\n")
.map(l => l.split(": "))
.map((l) => Number(l[1]))


const instructions = raw[1].split(": ")[1].split(",")
.map(n=>Number(n))

const instructions2 = structuredClone(instructions)

let ip = 0

let out = []

console.log(regs,instructions)

function getOperand(num:number){
  if(num < 4) return num
  else return regs[num-4]
}

function preformInst(inst:number,op:number){
  const cop = getOperand(op)

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
    out.push(cop%8)
  }else if(inst == 6){
    regs[1] = Math.floor(regs[0]/(2**cop))
  }else if(inst == 7){
    regs[2] = Math.floor(regs[0]/(2**cop))
  } 
  
}

while(ip+1 < instructions.length){

  preformInst(instructions[ip],instructions[ip+1])
  ip+=2
}

console.log("p1:",out.join(","))  


let aval = 0
ip = 0

const instHash = instructions.join(",")

while(true){
  if(aval % 10_000_000 == 0) console.log(aval)
  regs = [aval,0,0]
  out = []
  ip = 0

  while(ip+1 < instructions.length){
    preformInst(instructions[ip],instructions[ip+1])
    ip+=2
  }
  // console.log("hashes",instHash,"out",out.join(","))
  if(out.join(",") == instHash){
    console.log("p2:",aval) 
    break
  }
  aval++ 
}


//greater than 23 billion
