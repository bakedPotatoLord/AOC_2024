import {getInput, numberSum,v2,vec2} from './helpers'

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
    const region:vec2[] = [v2(i,j)]
    let queue:vec2[] = [v2(i,j)]
    visited[i][j] = true

    while (queue.length > 0) {
      let v = queue.pop()
      const touching = v.neighbors4
      .filter(t => isOnScreen(t[0], t[1]) && raw[t[0]][t[1]] == char && !visited[t[0]][t[1]])

      touching.forEach(t => visited[t[0]][t[1]] = true)
      queue.push(...touching)

      area += touching.length
      region.push(...touching)

      
    }

    const regionSet = new Set(region.map(l => l.toHash()))

    let perimeter = numberSum(region.map((v) => v.neighbors4
    .filter(t =>! regionSet.has(t.toHash())).length))


    // console.log("char", char, "area", area, "perimeter", perimeter)


    const sides = calcBulk(regionSet)

    if(regionCosts.has(char)) regionCosts.set(char, regionCosts.get(char)+ (area* perimeter))
    else regionCosts.set(char, area* perimeter)
  

    console.log("char", char, "area", area, "sides", sides)
    if(regionCosts2.has(char)) regionCosts2.set(char, regionCosts2.get(char)+ (area*sides))
    else regionCosts2.set(char, (area*sides))
    
  }
}


function isOnScreen(i: number, j: number) {
  return i >= 0 && i < raw.length && j >= 0 && j < raw[i].length
}



// console.log(regionCosts)

console.log("part 1:", numberSum(Array.from(regionCosts.values())))  

console.log("part 2:", numberSum(Array.from(regionCosts2.values())))


//returns number of sides from hash set
function calcBulk(hashes: Set<string>) {

  let sideCt = 0
  const mxc = structuredClone(raw) // matrix copy

  

  //do sides calc here
        
  for(let r = 0; r < 2; r++){ //rotate the matrix 90 degrees
    // console.log(char)
    
      // I'm only gonna be searching horisontally and then vertically
      //add to the map if you go from non-char to char
      
      //searching top row
      let f = false
      for(let i = 0; i < mxc[0].length; i++){
        let isChar = inHashes(v2(0,i))
        if(isChar && !f) sideCt++
        f = isChar
      } 

      //searching bottom row
      f = false
      for(let i = 0; i < mxc[mxc.length-1].length; i++){
        let isChar = inHashes(v2(mxc.length-1,i))
        if(isChar && !f ) sideCt++
        f = isChar
      }
      //search all inside rows
      for(let i = 0; i < mxc.length-1; i++){
        
        let ft = false
        let fb = false
        let madeFence = false
        for(let j = 0; j < mxc[mxc.length-1].length; j++){//searching both rows
          let t = inHashes(v2(i,j))
          let b = inHashes(v2(i+1,j))
          // console.log(a,b)
          let needFence = ( t !== b) 
          //sidect increaces if jump from t xor b to ! (t xor b) 
          // or if jump from t to !t and b to !b
          if( needFence && (!madeFence || (t == !ft && b == !fb))  ) sideCt++
          ft = t
          fb = b
          madeFence = needFence
        }

      }
    
    rotateMatrix(mxc)
  }

  return sideCt

  function inHashes(v:vec2){
    return hashes.has(v.toHash())
  }

  function rotateMatrix(matrix: any[][]) {
    const n = matrix.length;

    // Transpose the matrix
    for (let i = 0; i < n; i++) {
      for (let j = i; j < n; j++) {
        const temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
      }
    }

    // Reverse each row
    for (let i = 0; i < n; i++) {
      matrix[i].reverse();
    }
  }


}

// console.log("part 2:", sum)

