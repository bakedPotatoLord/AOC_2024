import fs from 'node:fs/promises'

export function numberSum(arr:number[]){
  return arr.reduce((a,b)=>a+b,0)
}

export async function getInput(day:number){
  return await fs.readFile(`inputs/${day}.txt`,{encoding:"utf8"})
}

export type vec2 = [number,number]

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

export enum Direction{
  left,
  right,
  up,
  down,
}

export function getPerpendicular(dir:Direction):[Direction,Direction]{
  if(dir == Direction.left || dir == Direction.right) return [Direction.up,Direction.down]
  else return [Direction.left,Direction.right]
}