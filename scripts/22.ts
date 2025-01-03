import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2 } from './helpers'

const raw = (await getInput(22))
  .split("\n")
.map(Number)


function next(i:bigint){
  const mul = i << 6n
  i = (i ^ mul)%16777216n
  const div  = i >> 5n
  i = (i ^ div)%16777216n
  const mul2 = i << 11n
  i = (i ^ mul2)%16777216n
  return i
}

function calcAfter(reps: number, start: number){
  let b = BigInt(start)
  for(let i = 0; i < reps; i++){
    b= next(b)
  }
  return b
}


console.log("part 1",raw.map(n=>calcAfter(2000,n)).reduce((a,b)=>a+b,0n)) 