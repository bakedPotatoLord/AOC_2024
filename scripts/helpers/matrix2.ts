import { re } from "mathjs";


export default class Matrix2<T> extends Array<Array<T>> {
  private height: number;
  private width: number;
  private mx:T[][];

  constructor(mx:T[][] ) {
    super(mx.length);

    this.height = mx.length;
    this.width = mx[0].length;
    this.mx = structuredClone(mx)
    
  }

  get(i: number, j: number) {
    if(!this.inBounds(i,j)) return undefined
    return this.mx[i][j]
  }


  inBounds(i: number, j: number) {
    return i >= 0 && i < this.height && j >= 0 && j < this.width
  }
}