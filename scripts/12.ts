import {getInput, numberSum} from './helpers'
type vec2 = [number, number]

const raw = (await getInput(12))
.split("\n")
.map(l => l.split(""))

const visited = structuredClone(raw).map(l => l.map(_ => false))


const regionCosts = new Map<string, number>()
const regionCosts2 = new Map<string, number>()


for (let i = 0; i < raw.length; i++) {
  for (let j = 0; j < raw[i].length; j++) {
    if(visited[i][j]) continue
    const char = raw[i][j]
    let area = 1
    const region:vec2[] = [[i,j]]
    let queue:vec2[] = [[i,j]]
    visited[i][j] = true

    while (queue.length > 0) {
      const [x, y] = queue.pop()
      const touching = gettouching(x, y)
      .filter(t => isOnScreen(t[0], t[1]) && raw[t[0]][t[1]] == char && !visited[t[0]][t[1]])

      touching.forEach(t => visited[t[0]][t[1]] = true)
      queue.push(...touching)

      area += touching.length
      region.push(...touching)

      //do sides calc here
      
      for(let i = 0; i < touching.length; i++){ //iterate over rows

        let last

        let j=0
        while(j < touching.length){ //iterate over columns
          
        }
      }

    }

    const regionSet = new Set(region.map(l => l.join(",")))

    let perimeter = numberSum(region.map(([i,j]) => gettouching(i,j)
    .filter(t =>! regionSet.has(t.join(","))).length))


    // console.log("char", char, "area", area, "perimeter", perimeter)

    if(regionCosts.has(char)) regionCosts.set(char, regionCosts.get(char)+ (area* perimeter))
    else regionCosts.set(char, area* perimeter)
  }
}


function isOnScreen(i: number, j: number) {
  return i >= 0 && i < raw.length && j >= 0 && j < raw[i].length
}

function gettouching(i: number, j: number) {
  return <vec2[]>[ [i,j+1],[i,j-1],[i+1,j],[i-1,j] ]
}

// console.log(regionCosts)

console.log("part 1:", numberSum(Array.from(regionCosts.values())))  



 