import fs from 'node:fs/promises'

export function numberSum(arr:number[]){
  return arr.reduce((a,b)=>a+b,0)
}

export async function getInput(day:number){
  return await fs.readFile(`inputs/${day}.txt`,{encoding:"utf8"})
}

export class vec2 extends Array{
  constructor(i:number,j:number){
    super(2)
    this[0] = i
    this[1] = j
  }
}

export function vectorEquals(v1:vec2,v2:vec2):boolean{
  return v1[0] == v2[0] && v1[1] == v2[1]
}

export function vectorAdd(v1:vec2,v2:vec2):vec2{
  return [v1[0]+v2[0],v1[1]+v2[1]]
}
export function vectorSub(v1:vec2,v2:vec2):vec2{
  return [v1[0]-v2[0],v1[1]-v2[1]]
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