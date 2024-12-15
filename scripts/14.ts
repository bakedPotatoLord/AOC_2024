import {dispMatrix, getInput, numberSum, vectorAdd, vectorEquals, type vec2} from './helpers'

import  * as math from 'mathjs'

const raw = (await getInput(14))
.split("\n")
.map(sl=>sl.split(/,|\:\ |\=|\+|\ / ))
.map((a)=><vec2[]>[[Number(a[2]),Number(a[1])],[Number(a[5]),Number(a[4])]])

const heightMax = 7

const widthMax = 11


function outside(pos:vec2){
  return pos[1] < 0 || pos[1] > heightMax || pos[0] < 0 || pos[0] > widthMax
}

for(let i = 0; i < 100; i++){

  const mx = Array(heightMax).fill(0).map(_ => Array(widthMax).fill(0))

  

  for(let r of raw){

    const [pos,vel] = r

    if(outside(pos)){
      console.log("outside", pos,outside(pos))
    }else{
      mx[pos[0]][pos[1]]++
      console.log(pos)
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
  
  console.log(i)
  dispMatrix(mx) 

}

// console.log(raw)
