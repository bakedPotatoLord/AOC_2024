import { dispMatrix, getInput, numberSum, type vec2 } from './helpers'

const raw = (await getInput(8))
  .split("\n")
  .map(l => l.split(""))

//dispMatrix(raw)

const charMaps: Map<string, Set<vec2>> = new Map()

function onMatrix(i, j) {
  return i >= 0 && j >= 0 && i < raw.length && j < raw[0].length
}


for (let i = 0; i < raw.length; i++) {
  for (let j = 0; j < raw[i].length; j++) {
    if (raw[i][j] == ".") continue
    if (charMaps.has(raw[i][j])) {
      charMaps.get(raw[i][j]).add([i, j])
    } else {
      charMaps.set(raw[i][j], new Set([[i, j]]))
    }
  }
}

function getAntinodes(nodes: vec2[]) {
  const arr: vec2[] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const diff: vec2 = [nodes[i][0] - nodes[j][0], nodes[i][1] - nodes[j][1]]
      //console.log("diff", diff)
      //console.log(nodes[i], nodes[j])
      arr.push(
        [nodes[i][0] + diff[0], nodes[i][1] + diff[1]],
        [nodes[j][0] - diff[0], nodes[j][1] - diff[1]]
      )
    }
  }
  return arr
}

let antinodes = Array.from(charMaps.values())
  .map(l => getAntinodes(Array.from(l)).filter(l => onMatrix(l[0], l[1])))


//console.log(antinodes) 

const flat = Array.from(new Set(antinodes.flat(1).map(l => l.join(","))))

console.log("part 1:", flat.length)


function getMoreAntinodes(nodes: vec2[]) {
  const arr: vec2[] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const diff: vec2 = [nodes[i][0] - nodes[j][0], nodes[i][1] - nodes[j][1]]
      // console.log("diff", diff)
      // console.log("i,j", nodes[i], nodes[j])
      arr.push(nodes[i], nodes[j])
      const starti = structuredClone(nodes[i])

      // console.log(starti)
      while (true) {
        starti[0] += diff[0]
        starti[1] += diff[1]
        // console.log("huh",starti)
        if (!onMatrix(starti[0], starti[1])) break
        else arr.push(structuredClone(starti))
      }
      const startj = structuredClone(nodes[i])
      // console.log(starti)
      while (true) {
        startj[0] -= diff[0]
        startj[1] -= diff[1]
        // console.log("huh",starti)
        if (!onMatrix(startj[0], startj[1])) break
        else arr.push(structuredClone(startj))
      }
      // 

      // console.log("arr", arr)
    }
  }
  // console.log("returnArr", arr)
  return arr
}

let moreantinodes = Array.from(charMaps.values())
  .map(l => getMoreAntinodes(Array.from(l))
    .filter(l => onMatrix(l[0], l[1])))

// console.log(moreantinodes)


const flat2 = Array.from(new Set(moreantinodes.flat(1).map(l => l.join(","))))

const mx = structuredClone(raw).map(l => l.map(_ => "."))

moreantinodes.flat(1).forEach(l => mx[l[0]][l[1]] = "#")

// dispMatrix(mx)

//not 929

//check 958 

console.log("part 2:", flat2.length) 
