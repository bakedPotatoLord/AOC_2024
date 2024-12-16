import fs from 'node:fs/promises'

export function numberSum(arr:number[]){
  return arr.reduce((a,b)=>a+b,0)
}

export async function getInput(day:number){
  return await fs.readFile(`inputs/${day}.txt`,{encoding:"utf8"})
}

//my homebrewed vector class
export class vec2 extends Array<number>{
  0:number
  1:number
  constructor(i:number|string,j:number|string){
    super(2)
    this[0] = Number(i)
    this[1] = Number(j)
  }


  // public static readonly zero = new vec2(0,0)


  public static get zero(){
    return new vec2(0,0)
  }

  public static get up(){
    return new vec2(-1,0)
  }
  public static get down(){
    return new vec2(1,0)
  }
  public static get left(){
    return new vec2(0,-1)
  }
  public static get right(){
    return new vec2(0,1)
  }

  public static get upLeft(){
    return new vec2(-1,-1)
  }
  public static get upRight(){
    return new vec2(-1,1)
  }
  public static get downLeft(){
    return new vec2(1,-1)
  }
  public static get downRight(){
    return new vec2(1,1)
  }

  public static get dirs4(){
    return [vec2.right,vec2.left,vec2.up,vec2.down]
  }

  public static get dirs8(){
    return [vec2.right,vec2.left,vec2.up,vec2.down,vec2.upRight,vec2.upLeft,vec2.downRight,vec2.downLeft]
  }

  public get neighbors4(){
      return vec2.dirs4.map(v=>v.add(this))
  }

  public get neighbors8(){
    return vec2.dirs8.map(v=>v.add(this))
  }

  public copy(){
    return new vec2(this[0],this[1])
  }

  public add(v:vec2){
    this[0] += v[0]
    this[1] += v[1]
    return this
  }

  public sub(v:vec2){
    this[0] -= v[0]
    this[1] -= v[1]
    return this

  }

  public mul(v:vec2){
    this[0] *= v[0]
    this[1] *= v[1]
    return this

  }

  public div(v:vec2){
    this[0] /= v[0]
    this[1] /= v[1]
    return this
  }

  public equals(v:vec2){
    return this[0] == v[0] && this[1] == v[1]
  }

  public rotateClockwise(){
    let temp = this[0]
    this[0] = -this[1]
    this[1] = temp
    return this

  }

  public rotateCounterClockwise(){
    let temp = this[0]
    this[0] = this[1]
    this[1] = -temp
    return this
  }

  public invertDirection(){
    this[0] *= -1
    this[1] *= -1
    return this
  }

  public toHash(){
    return `${this[0]},${this[1]}`
  }

  public fromHash(s:string){
    let [x,y] = s.split(",")
    return new vec2(x,y)
  }

}

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