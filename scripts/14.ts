import {dispMatrix, getInput, numberSum, vectorAdd, vectorEquals, type vec2} from './helpers'

import  * as math from 'mathjs'

const raw = (await getInput(14))
.split("\n")
.map(sl=>sl.split(/,|\:\ |\=|\+|\ / ))
.map((a)=><vec2[]>[[Number(a[2]),Number(a[1])],[Number(a[5]),Number(a[4])]])

const heightMax = 103

const widthMax = 101


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
    

    while(pos[0]< 0){
      pos[0]+=heightMax
      // console.log(pos[0])
    }
    while(pos[1]<0){
      pos[1]+=widthMax 
    }

    pos[0] =  pos[0] % heightMax 
    pos[1] =  pos[1] % widthMax

  }
  
  // console.log(i)
  
}

// dispMatrix(mx) 

let regions = Array(4).fill(0)

const iCenter = Math.floor(heightMax/2)
const jCenter = Math.floor(widthMax/2)

for(let [pos] of raw){
  
  if(pos[0] == iCenter || pos[1] == jCenter){
    continue
  }
  else if(pos[0] < iCenter && pos[1] < jCenter){
    regions[0]++
  }
  else if(pos[0] < iCenter && pos[1] > jCenter){
    regions[1]++
  }
  else if(pos[0] > iCenter && pos[1] < jCenter){
    regions[2]++
  }
  else if(pos[0] > iCenter && pos[1] > jCenter){
    regions[3]++
  }
  else{
    console.log("error")
  }
}
  
console.log(regions.reduce((a,b)=>a*b))

//228447500 is too low



// console.log(raw)
