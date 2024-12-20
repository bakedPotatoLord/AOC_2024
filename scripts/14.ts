import {dispMatrix, getInput, numberSum, v2, vectorEquals, vec2} from './helpers'

import  * as math from 'mathjs'

const raw = (await getInput(14))
.split("\n")
.map(sl=>sl.split(/,|\:\ |\=|\+|\ / ))
.map((a)=>[v2(a[2],a[1]),v2(a[5],a[4])])



let heightMax = 0
let widthMax = 0

for(let [[i,j]] of raw){
  heightMax = Math.max(heightMax,i)
  widthMax = Math.max(widthMax,j)
}

heightMax++
widthMax++

function mod(n:number, m:number) {
  return ((n % m) + m) % m;
}

function outside(pos:vec2){
  return pos[1] < 0 || pos[1] > widthMax || pos[0] < 0 || pos[0] > heightMax
}

const runs = 100

let mx = Array(heightMax).fill(0).map(_ => Array(widthMax).fill(0))

for(let i = 0; i < runs+1; i++){

  mx = Array(heightMax).fill(0).map(_ => Array(widthMax).fill(0))

  for(let r of raw){

    const [pos,vel] = r

    if(outside(pos)){
      console.log("outside", pos,outside(pos))
    }else{
      mx[pos[0]][pos[1]]++
      // console.log("pos",pos,"vel",vel)
    }
    
    pos[0] += vel[0]
    pos[1] += vel[1]
    
    pos[0] =  mod(pos[0] , heightMax )
    pos[1] =  mod(pos[1] , widthMax )
  }

  // let copy = structuredClone(mx)

  // for(let i = 0; i < copy.length; i++){
  //   for(let j = 0; j < copy[0].length; j++){
  //     if(copy[i][j] == 0) mx[i][j] = "."
  //   }
  // }
  // dispMatrix(copy) 
}


let regions = Array(4).fill(0)

const iCenter = Math.floor(heightMax/2)
const jCenter = Math.floor(widthMax/2)

for(let i = 0; i < heightMax; i++){
  for(let j = 0; j < widthMax; j++){
    let r
    if(i == iCenter || j == jCenter || mx[i][j] == 0){
      continue
    }
    else if(i < iCenter && j < jCenter){
      
      r= 0
    }
    else if(i < iCenter && j > jCenter){
      r =1
    }
    else if(i > iCenter && j < jCenter){
      r = 2
    }
    else if(i > iCenter && j > jCenter){
      r= 3
    }
    else{
      console.log("error")
    }
    if(r!= undefined) regions[r] += mx[i][j]
  }
}

console.log("part 1:",regions.reduce((a,b)=>a*b)) 

