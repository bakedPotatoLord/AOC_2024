import fs from 'node:fs/promises'

import vec2 from './vec2'

export function numberSum(arr:number[]){
  return arr.reduce((a,b)=>a+b,0)
}

export async function getInput(day:number){
  return await fs.readFile(`inputs/${day}.txt`,{encoding:"utf8"})
}

//my homebrewed vector class


export function vectorEquals(v1:vec2,v2:vec2):boolean{
  return v1[0] == v2[0] && v1[1] == v2[1]
}



export function dispMatrix(mx:any[][]){
  console.log(mx.map(r=>r.join("")).join("\n"))
}


//converts arrow (>,<,v,^) to vec2
export function convertSign(char: string) {
  if(char == ">") return <vec2>[0,1]
  else if(char == "<") return <vec2>[0,-1]
  else if(char == "v") return <vec2>[1,0]
  else if(char == "^") return <vec2>[-1,0]
}

export function v2(x:number|string,y:number|string){
  return new vec2(x,y)
}