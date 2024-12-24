import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2 } from './helpers'

const raw = (await getInput(21))
  .split("\n")


console.log(raw)

let numericPadPos = v2(3,2)

// +---+---+---+
// | 7 | 8 | 9 |
// +---+---+---+
// | 4 | 5 | 6 |
// +---+---+---+
// | 1 | 2 | 3 |
// +---+---+---+
//     | 0 | A |
//     +---+---+

let dirPadA = v2(0,1)
let dirPadB = v2(0,1)
let dirPadC = v2(0,1)

// +---+---+
// | ^ | A |
// +---+---+---+
// | < | v | > |
// +---+---+---+

type keyT= 9|8|7|6|5|4|3|2|1|0|"A"

let positionLUT:Record<keyT,vec2> = {
  7:v2(0,0),
  8:v2(0,1),
  9:v2(0,2),
  4:v2(1,0),
  5:v2(1,1),
  6:v2(1,2),
  1:v2(2,0),
  2:v2(2,1),
  3:v2(2,2),
  0:v2(3,1),
  "A":v2(3,2),
}

function keypadInstructions(key:keyT){
  let v = (positionLUT[key])
  let [i,j] = v.csub(numericPadPos)

  let str = ""

  str += Array(Math.abs(j)).fill(j > 0 ? ">" : "<").join("")
  + Array(Math.abs(i)).fill(i > 0 ? "v" : "^").join("")+"A"
  numericPadPos = v
  
  return str
}


for(let code of raw.slice(0,1)){
  let numeric = parseInt(code.match(/[0-9]*/)[0])

  let acc = ""
  for(let k of code.split("")){
    let arrs = keypadInstructions(<keyT>k)
    acc += arrs
  }

  

  console.log(code,numeric,acc)


}

