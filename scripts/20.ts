import {dispMatrix, getInput, numberSum, convertSign,v2, vectorEquals,vec2} from './helpers'

const raw = (await getInput(20))
.split("\n")
.map(l => l.split(""))


const scoreMap = new Map<string, number>() // vec2 hash : min seconds

let start : vec2

for(let i = 0; i < raw.length; i++){
  for(let j = 0; j < raw[i].length; j++){
    if(raw[i][j] == "S") start = v2(i,j)
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

  const possible = node.neighbors4
  for(let p of possible){
    q.push([p,secs+1])
  }
}

let cheatsMap = new Map<number,number>()
let cheatsMap2 = new Map<number,number>()

let around20 :vec2[] = []

for(let i = -20; i <= 20; i++){
  for(let j = -20; j <= 20; j++){
    if(Math.abs(i)+Math.abs(j) <= 20){
      around20.push(v2(i,j))
    } 
  }
}

for(let p of nonWall){
  let pVec = vec2.fromHash(p)
  let around = vec2.dirs4.map(vec=>vec.cmul(2)).map(v=>scoreMap.get(v.add(pVec).toHash()))
  let val = scoreMap.get(p)
  
  let cheats = around
  .filter(a => a !== undefined)
  .filter(a => a! > val)
  .map(a => a - val - 2)
  .filter(a => a > 0)

  let cheats2 = [];

  for(let v of around20){
    let moves = Math.abs(v[0])+Math.abs(v[1])
    let moveTo = v.cadd(pVec)
    let score = scoreMap.get(moveTo.toHash()) 
    if(score != undefined){
      score -= (val+moves)
      if(score > 0)cheats2.push(score)
    }
  }

  for(let c of cheats){
    if(cheatsMap.has(c)) cheatsMap.set(c,cheatsMap.get(c) + 1)
    else cheatsMap.set(c,1)
  }
  for(let c of cheats2){
    if(cheatsMap2.has(c)) cheatsMap2.set(c,cheatsMap2.get(c) + 1)
    else cheatsMap2.set(c,1)
  }
}

let over100 = Array.from(cheatsMap.entries()).filter(([k,v])=>k>=100).map(([k,v])=>v).reduce((a,b)=>a+b,0)
let over1002 = Array.from(cheatsMap2.entries()).filter(([k,v])=>k>=100).map(([k,v])=>v).reduce((a,b)=>a+b,0)

console.log("part1", over100) 
console.log("part2: ",over1002) 