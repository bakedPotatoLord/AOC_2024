import { getInput, numberSum, type vec2 } from './helpers'

const raw = (await getInput(6))
  .split("\n").map(l => l.split(""))

const visited = structuredClone(raw).map(l => l.map(_ => false))
const visited2 = structuredClone(raw).map(l => l.map(_ => 1))

let guard: vec2
let startPos: vec2

let dir: vec2 = [-1, 0]

function isOnScreen(i, j) {
  return i >= 0 && j >= 0 && i < raw.length && j < raw[0].length
}

function rotateRight(dir: vec2): vec2 {
  if (dir[0] == 0 && dir[1] == 1) return [1, 0]
  if (dir[0] == 1 && dir[1] == 0) return [0, -1]
  if (dir[0] == 0 && dir[1] == -1) return [-1, 0]
  if (dir[0] == -1 && dir[1] == 0) return [0, 1]
  return dir
}

for (let i = 0; i < raw.length; i++) {
  for (let j = 0; j < raw[i].length; j++) {
    if (raw[i][j] == "^") {
      guard = [i, j]
      startPos = [i, j]
    }
    visited[i][j] = false
  }
}

while (isOnScreen(guard[0], guard[1])) {
  visited[guard[0]][guard[1]] = true

  let newi = guard[0] + dir[0]
  let newj = guard[1] + dir[1]

  if (isOnScreen(newi, newj) && raw[newi][newj] == "#") {
    newi -= dir[0]
    newj -= dir[1]
    dir = rotateRight(dir)
  }
  guard = [newi, newj]
}

const look = visited.map(l => l.map(e => e ? 1 : 0).join("")).join("\n")

const numVisited = visited.reduce((a, b) => a + b.reduce((a, b) => a + Number(b), 0), 0)

console.log("part 1:", numVisited)

let count = 0
for (let i = 0; i < raw.length; i++) {
  for (let j = 0; j < raw[i].length; j++) {
    if (testrepetition([i, j])) count++

  }
  console.log(i / raw.length)
}

testrepetition([startPos[0], startPos[1] - 1])

//printMatrix(visited2) 

//not 1704

console.log("part 2:", count)


function testrepetition(v: vec2) {
  if (v[0] == startPos[0] && v[1] == startPos[1]) return false
  const pastPositions = new Set<string>()
  const mx = structuredClone(raw)
  guard = structuredClone(startPos)
  dir = [-1, 0]
  mx[v[0]][v[1]] = "#"

  //console.log(mx)

  while (isOnScreen(guard[0], guard[1])) {
    pastPositions.add(`${guard[0]},${guard[1]},${dir[0]},${dir[1]}`)
    let newi = guard[0] + dir[0]
    let newj = guard[1] + dir[1]

    if (isOnScreen(newi, newj) && mx[newi][newj] == "#") {
      newi -= dir[0]
      newj -= dir[1]
      dir = rotateRight(dir)
      visited2[guard[0]][guard[1]] = 0
    }
    guard = [newi, newj]

    if (pastPositions.has(`${guard[0]},${guard[1]},${dir[0]},${dir[1]}`)) {
      //console.log("found:",guard[0],guard[1],dir[0],dir[1])
      return true

    }
    //console.log(guard[0],guard[1],dir[0],dir[1])
  }
  return false
}

function printMatrix(mx: any[][]) {
  console.log(mx.map(r => r.join("")).join("\n"))
}
