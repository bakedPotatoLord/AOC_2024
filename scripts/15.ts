import {dispMatrix, getInput, numberSum, vectorAdd, vectorEquals, vectorSub, type vec2} from './helpers'


const raw = (await getInput(15))
.split("\n\n")

const moves = raw[1].split("\n").map(l => l.split("")).flat().map(convertSign)
const mx = raw[0].split("\n").map(l => l.split(""))

let robot:vec2

for(let i = 0;i<mx.length;i++){
  for(let j = 0;j<mx[i].length;j++){
    if(mx[i][j] == "@") robot = [i,j]
  }
}

function onMatrix(i: number, j: number) {
  return i >= 0 && i < mx.length && j >= 0 && j < mx[0].length
}

function convertSign(char: string) {
  if(char == ">") return <vec2>[0,1]
  else if(char == "<") return <vec2>[0,-1]
  else if(char == "v") return <vec2>[1,0]
  else if(char == "^") return <vec2>[-1,0]
}

for(let move of moves){
  let lookPos = vectorAdd(robot, [0,0])
  while(onMatrix(lookPos[0], lookPos[1])&& mx[lookPos[0]][lookPos[1]] != "#"){
    lookPos = vectorAdd(lookPos, move)
    if(mx[lookPos[0]][lookPos[1]] == "."){
      while(!vectorEquals(lookPos, robot )){
        let behind = vectorSub(lookPos, move)
        mx[lookPos[0]][lookPos[1]] = mx[behind[0]][behind[1]]
        lookPos = vectorSub(lookPos, move)
      }
      mx[robot[0]][robot[1]] = "."
      robot = vectorAdd(robot, move)
      break
    }
  }
}

let count = 0

for(let i = 0;i<mx.length;i++){
  for(let j= 0;j<mx[0].length;j++){
    if(mx[i][j] == 'O'){
      count += (100*i)+j
    } 
  }
}

dispMatrix(mx)

console.log(count)