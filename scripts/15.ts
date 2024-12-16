import {dispMatrix, getInput, numberSum, } from './helpers'


function vectorAdd(v1:vec2,v2:vec2):vec2{
  return [v1[0]+v2[0],v1[1]+v2[1]]
}

function vectorSub(v1:vec2,v2:vec2):vec2{
  return [v1[0]-v2[0],v1[1]-v2[1]]
}

function convertSign(char: string) {
  if(char == ">") return <vec2>[0,1]
  else if(char == "<") return <vec2>[0,-1]
  else if(char == "v") return <vec2>[1,0]
  else if(char == "^") return <vec2>[-1,0]
}

function vectorEquals(v1:vec2,v2:vec2):boolean{
  return v1[0] == v2[0] && v1[1] == v2[1]
}


type vec2 = [number, number]

const raw = (await getInput(15))
.split("\n\n")

const moves = raw[1].split("\n").map(l => l.split("")).flat().map(convertSign)
const mx = raw[0].split("\n").map(l => l.split(""))

const mxc = structuredClone(mx)

let robot:vec2

for(let i = 0;i<mx.length;i++){
  for(let j = 0;j<mx[i].length;j++){
    if(mx[i][j] == "@") robot = [i,j]
  }
}

function onMatrix(i: number, j: number) {
  return i >= 0 && i < mx.length && j >= 0 && j < mx[0].length
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

// dispMatrix(mx)

console.log("part 1:",count)


for(let l of mxc){
  for(let j = l.length-1;j>=0;j--){
    const char = l[j]
    let insert:string
    if(char == ".") insert = ".."
    else if(char == "O") insert = "[]"
    else if(char == "#") insert = "##"
    else if(char == "@") insert = "@."
    else{
      console.log(char)
    }

    l.splice(j, 1, ...insert.split("") )
  }
}

// dispMatrix(mxc)



function checkMove(pos: vec2, move: vec2) {

  let newPos = vectorAdd(pos, move)
  let val = mxc[newPos[0]][newPos[1]] 
  

  if(val == "#") return false
  else if(val == ".") return true 
  else if(move[0]=== 0) return checkMove(newPos, move) // if moving horisontal, no extra check required
  else if(move[1] === 0){ // if moving vertical, need to check boxes
    if(val == "[") return checkMove(newPos, move) && checkMove(vectorAdd(newPos,[0,1]), move) // check both boxes
    else if(val == "]") return checkMove(newPos, move) && checkMove(vectorAdd(newPos,[0,-1]), move) // check both boxes
  }
}

function doMove(pos:vec2,move:vec2,char:string) {
  const next = vectorAdd(pos, move)
  const val = mxc[next[0]][next[1]]
  if(val == "."){
    mxc[next[0]][next[1]] =mxc[pos[0]][pos[1]]
    mxc[pos[0]][pos[1]] = char
  }else if(move[0]=== 0){ // if moving horisontal, 
    doMove(next, move, mxc[pos[0]][pos[1]])
    mxc[pos[0]][pos[1]] = char
  } 
  else if(move[1] === 0){ // if moving vertical, need to check boxes
    if(val == "["){
      const otherBox = vectorAdd(next,[0,1])
      doMove(next, move, mxc[pos[0]][pos[1]])
      doMove(otherBox, move, mxc[pos[0]][pos[1]])
      mxc[otherBox[0]][otherBox[1]] = '.'
      mxc[next[0]][next[1]] = mxc[pos[0]][pos[1]]
    }else if(val == "]"){
      const otherBox = vectorAdd(next,[0,-1])
      doMove(next, move, mxc[pos[0]][pos[1]])
      doMove(otherBox, move, mxc[pos[0]][pos[1]])
      mxc[otherBox[0]][otherBox[1]] = '.'
      mxc[next[0]][next[1]] = mxc[pos[0]][pos[1]]
    }
  }
}


for(let i = 0;i<mxc.length;i++){
  for(let j= 0;j<mxc[0].length;j++){
    if(mxc[i][j] == '@') robot = [i,j]
  }
}

for(let move of moves){
  const movable = checkMove(robot, move)
  if(movable){
    doMove(robot, move, ".")
    mxc[robot[0]][robot[1]] = "."
    robot = vectorAdd(robot, move)
  }
}

let count2 = 0
for(let i = 0;i<mxc.length;i++){
  for(let j= 0;j<mxc[0].length;j++){ 
    if(mxc[i][j] == '['){
      count2 += (100*i)+j 
    } 
  }
}
dispMatrix(mxc)
console.log("part 2:",count2)
