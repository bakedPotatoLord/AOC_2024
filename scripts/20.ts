import {dispMatrix, getInput, numberSum, convertSign,v2, vectorEquals,vec2} from './helpers'

const raw = (await getInput(20))
.split("\n")
.map(l => l.split(""))


const scoreMap = new Map<string, number>() // vec2 hash : min seconds

let start : vec2
let end: vec2

for(let i = 0; i < raw.length; i++){
  for(let j = 0; j < raw[i].length; j++){
    if(raw[i][j] == "S") start = v2(i,j)
    else if(raw[i][j] == "E") end = v2(i,j)
  }
}

let q: [vec2,number][] = [[start,0]]

let nonWall = new Set<string>([start.toHash()])

while(q.length > 0){
  let [node,secs] = q.shift()

  const value = raw[node[0]][node[1]]

  if(value == "#") continue

  nonWall.add(node.toHash())

  if(scoreMap.has(node.toHash())){
    if(scoreMap.get(node.toHash()) > secs){
      scoreMap.set(node.toHash(),secs)
    }else{
      continue
    }
  }else{
    scoreMap.set(node.toHash(),secs)
  }

  if(node.equals(end)){
    console.log("found end", secs)
  }

  const possible = node.neighbors4
  for(let p of possible){
    q.push([p,secs+1])
  }

}

let cheatsMap = new Map<number,number>()
// console.log(nonWall)

for(let p of nonWall){

  let pVec = vec2.fromHash(p)
  let around = vec2.dirs4.map(vec=>vec.mul(v2(2,2))).map(v=>scoreMap.get(v.add(pVec).toHash()))
  const hash = p
  let val = scoreMap.get(hash)
  
  let cheats = around.filter(a => a !== undefined).filter(a => a! > val)
  .map(a => a - val - 2)
  .filter(a => a > 0)

  for(let c of cheats){
    if(cheatsMap.has(c)) cheatsMap.set(c,cheatsMap.get(c) + 1)
    else cheatsMap.set(c,1)
  }
  

}
// console.log(cheatsMap)

let over100 = 0

for(let [k,v] of cheatsMap){
  if(k >= 100){
    over100 += v
  }
}

console.log("part1", over100) 

// dispMatrix(raw)