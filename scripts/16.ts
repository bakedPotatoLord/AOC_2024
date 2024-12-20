import {dispMatrix, getInput, numberSum, vectorEquals,convertSign, vec2} from './helpers'

const raw = (await getInput(16))
.split("\n")
.map(l => l.split(""))

const scoreMap = new Map<string, number>()

const parentMap = new Map<[[vec2,vec2],number],[[vec2,vec2],number]>() // node: parent[]

function toHash(v:[vec2,vec2]){
  return `${v[0].toHash()},${v[1].toHash()}`
}

// dispMatrix(raw)

let start:[vec2,vec2]
let end:vec2

let endNodes: [[vec2,vec2],number][] = [];

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
  let node = q.shift()

  const [[pos,dir], score] = node
  const value = raw[pos[0]][pos[1]]

  // console.log("pos",pos,"dir",dir,"score",score)

  if(value == "#" ) continue

  const hash = toHash([pos,dir])
  if(scoreMap.has(hash)){

    if(scoreMap.get(hash) >= score){
      scoreMap.set(hash,score)
    } 
    else continue
    
  }
  else{
    scoreMap.set(hash,score)
  }

  if(vectorEquals(pos,end)){
    // console.log("found end")
    endNodes.push( node)
  }

  let children:[[vec2,vec2],number][] = [
    [[pos.copy().add(dir),dir],score + 1],
    [[pos,dir.copy().rotateClockwise()],score + 1000],
    [[pos,dir.copy().rotateCounterClockwise()],score + 1000],

  ]

  for(let child of children){
    parentMap.set(child,node)
  }
  q.push(...children)
}

const lowestScore = endNodes.sort((a,b) => a[1] - b[1])[0][1]
console.log("part1:",lowestScore) 

const finalistNodes = endNodes.filter(n => n[1] == lowestScore)


// console.log(parentMap.get(finalistNodes[0]))


let positionSet = new Set<string>()


function rec(n:[[vec2,vec2],number]){
  const [[pos,dir], score] = n

  positionSet.add(pos.toHash())

  const parent = parentMap.get(n)
  if(parent == undefined) return
  rec(parent)
}

//follow the path of the lowest score

for(let node of finalistNodes){
  rec(node)
}

console.log("part 2:",positionSet.size) 