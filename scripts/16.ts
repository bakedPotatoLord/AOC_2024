import {dispMatrix, getInput, numberSum, vectorEquals,convertSign, vec2} from './helpers'

const raw = (await getInput(16))
.split("\n")
.map(l => l.split(""))

const scoreMap = new Map<string, number>()

const pathMap = new Map<string,[vec2,vec2]>()

function toHash(v:[vec2,vec2]){
  return `${v[0].toHash()},${v[1].toHash()}`
}

dispMatrix(raw)

let start:[vec2,vec2]
let end:vec2

for(let i = 0;i<raw.length;i++){
  for(let j = 0;j<raw[i].length;j++){
    if(raw[i][j] == "E") end = new vec2(i,j)
    else if(raw[i][j] == "S") start = [new vec2(i,j),vec2.right]
  }
}
//array of [[pos,dir],score]
const q:[[vec2,vec2],number][] = [[start,0]]
// pathMap.set(toHash(start),[[start]])

while(q.length > 0){


  const [[pos,dir], score] = q.shift()
  const value = raw[pos[0]][pos[1]]

  // console.log("pos",pos,"dir",dir,"score",score)

  if(value == "#" ) continue

  const hash = toHash([pos,dir])
  if(scoreMap.has(hash)){

    if(scoreMap.get(hash) > score){
      scoreMap.set(hash,score)
      pathMap.set(hash,[pos,dir])
    } 
    else if(scoreMap.get(hash) == score){

      continue
    }
    else continue
    
  }
  else{
    scoreMap.set(hash,score)
  }

  if(vectorEquals(pos,end)){
    // console.log("found end")
  }

  q.push([[pos.copy().add(dir),dir],score + 1])
  q.push([[pos,dir.copy().rotateClockwise()],score + 1000])
  q.push([[pos,dir.copy().rotateCounterClockwise()],score + 1000])

  
}

const lowest = vec2.dirs4.map(d => scoreMap.get(toHash([end,d]))).reduce((a,b) => Math.min(a,b))

console.log("part1:",lowest) 


//follow the path of the lowest score

console.log(start)

q

while(true){



}