import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2 } from './helpers'

const raw = (await getInput(25))
.split("\n\n")
.map(k=>k.split("\n").map(l=>l.split("")))

const keys = raw.filter(k=>k[0][0] ==".")
.map(k=>convert(k))


const locks = raw.filter(k=>k[0][0] =="#")
.map(k=>convert(k))

// convert matrix to array of counts
function convert(mx:string[][]){
  let cols:number[] = Array(mx[0].length).fill(-1)
  for(let i = 0;i<mx.length;i++){
    for(let j = 0;j<mx[0].length;j++){
      if(mx[i][j] == "#") cols[j]++
    }
  }
  return cols
}

//check if key and lock are valid
function isValid(key:number[],lock:number[]){
  for(let i = 0;i<key.length;i++){
    if((key[i]+lock[i] >= 6)) return false
  }
  return true
}


let count =  0
for(let key of keys){
  for(let lock of locks){

    if(isValid(key,lock)){
      count++
      // console.log(lock,key)
    }
  }
}

//not 3751
    
console.log(count)
