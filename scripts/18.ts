import {dispMatrix, getInput, numberSum, convertSign,v2, vectorEquals,vec2} from './helpers'

const raw = (await getInput(18))
.split("\n")
.map(l => v2(l.split(",")[0],l.split(",")[1]))


let size = 71

let mx = Array(size).fill(0).map(_ => Array(size).fill('.'))

let visited = structuredClone(mx).map(l => l.map(_ => false))

const drawBytes = 1024


for(let b of raw.slice(0,drawBytes)){

  mx[b[0]][b[1]] = "#" 
}

// dispMatrix(mx)

function onMatrix(i: number, j: number) {
  return i >= 0 && i < mx.length && j >= 0 && j < mx[0].length
}

const start = v2(0,0)
const end = v2(size-1,size-1)
// visited[start[0]][start[1]] = true
const q = [start]
const parentMap = new Map<vec2,vec2>()

let endVec:vec2

while(q.length > 0){
  const next = q.shift()

  if(!onMatrix(next[0], next[1]) || mx[next[0]][next[1]] == "#" || visited[next[0]][next[1]]) continue

  if(next.equals(end)){
    endVec = next
    break
  }

  const possible = next.neighbors4
  possible.forEach(p => {
    parentMap.set(p,next)
  })
  // console.log("next",next,"possible",possible)
  q.push(...possible)

  visited[next[0]][next[1]] = true

}
let count = 0
let temp = endVec
while(!temp.equals(start)){
  count++
  temp = parentMap.get(temp)
  // console.log(temp.toHash())
}


console.log("part 1:",count)



mx = Array(size).fill(0).map(_ => Array(size).fill('.'))

let solved = 0

for(let b of raw){
  mx[b[0]][b[1]] = "#"

  const start = v2(0,0)
  const end = v2(size-1,size-1)
  const q = [start]
  let visited = structuredClone(mx).map(l => l.map(_ => false))

  let endVec:vec2
  let solved = false

  while(q.length > 0){
    const next = q.shift()

    if(!onMatrix(next[0], next[1]) || mx[next[0]][next[1]] == "#" || visited[next[0]][next[1]]) continue

    if(next.equals(end)){
      endVec = next
      solved = true
      break 
    }

    const possible = next.neighbors4
    // console.log("next",next,"possible",possible)
    q.push(...possible)

    visited[next[0]][next[1]] = true

  }

  // console.log(solved)
  if(!solved){
    console.log("part 2",b.join(","))
    break
  }

}

