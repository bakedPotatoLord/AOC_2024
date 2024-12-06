import { getInput, numberSum } from './helpers'

const raw = (await getInput(4))
  .split("\n")
  .map(l => l.split(""))

const copy = structuredClone(raw)

copy.forEach(r => r.forEach((_, i) => r[i] = "."))



let count = 0
let count2 = 0

const ends = new Set()

function withinBounds(i, j) {
  return i >= 0 && j >= 0 && i < raw.length && j < raw[0].length
}

for (let [i, row] of raw.entries()) {

  for (let [j, item] of row.entries()) {

    searchX(Number(i), Number(j))
    searchX2(Number(i), Number(j))
  }

}

function searchX(i, j) {
  if (raw[i][j] == "X") {

    if (searchM(i + 1, j) && searchA(i + 2, j) && searchS(i + 3, j)) count++
    if (searchM(i - 1, j) && searchA(i - 2, j) && searchS(i - 3, j)) count++

    if (searchM(i, j + 1) && searchA(i, j + 2) && searchS(i, j + 3)) count++
    if (searchM(i, j - 1) && searchA(i, j - 2) && searchS(i, j - 3)) count++

    if (searchM(i + 1, j + 1) && searchA(i + 2, j + 2) && searchS(i + 3, j + 3)) count++
    if (searchM(i - 1, j - 1) && searchA(i - 2, j - 2) && searchS(i - 3, j - 3)) count++

    if (searchM(i + 1, j - 1) && searchA(i + 2, j - 2) && searchS(i + 3, j - 3)) count++
    if (searchM(i - 1, j + 1) && searchA(i - 2, j + 2) && searchS(i - 3, j + 3)) count++

  }
}

function searchM(i, j) {
  return withinBounds(i, j) && raw[i][j] == "M"
}

function searchA(i, j) {
  return withinBounds(i, j) && raw[i][j] == "A"
}

function searchS(i, j) {
  return withinBounds(i, j) && raw[i][j] == "S"
}

console.log("part 1:", count)


//T
//L
//R
//B

function searchX2(i, j) {
  if (raw[i][j] == "A") {

    if (searchM(i - 1, j - 1) && searchS(i + 1, j + 1) && searchM(i - 1, j + 1) && searchS(i + 1, j - 1)) { count2++; copy[i][j] = "T" }

    if (searchM(i - 1, j - 1) && searchS(i + 1, j + 1) && searchM(i + 1, j - 1) && searchS(i - 1, j + 1)) { count2++; copy[i][j] = "L" }

    if (searchM(i - 1, j + 1) && searchS(i + 1, j - 1) && searchM(i + 1, j + 1) && searchS(i - 1, j - 1)) { count2++; copy[i][j] = "R" }

    if (searchM(i + 1, j - 1) && searchS(i - 1, j + 1) && searchM(i + 1, j + 1) && searchS(i - 1, j - 1)) { count2++; copy[i][j] = "B" }

  }
}

console.log("part 2:", count2)

//console.log(copy.map(r=>r.join("")).join("\n")) 