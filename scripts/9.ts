import {getInput, numberSum, type vec2} from './helpers'

const raw = (await getInput(9))
.split("")
.map(Number)

const disk = []
const disk2:vec2[] = []


let id = 0
let skip = false
for(let i = 0; i < raw.length; i++){
  if(skip){
    disk.push(...Array(raw[i]).fill(NaN))
    disk2.push([raw[i],NaN])
  }
  else{
    disk.push(...Array(raw[i]).fill(id))
    disk2.push([raw[i],id])
    id++
  }

  skip = !skip
}


let i = 0
while(i<disk.length-1){
  if(isNaN(disk[i])){
    let end = disk.pop()
    while(isNaN(end)){
      end = disk.pop()
    }
    disk[i] = end
  }
  // console.log(disk[i],)
  i++
}
disk.pop()


disk.filter(l => l == undefined)

// console.log(disk.slice(-10))


let sum  = 0

for(let i = 0; i < disk.length; i++){
  // console.log(disk[i], i)
  if(disk[i] == undefined) continue
  sum += disk[i] * i
}

//not 6201130369999

//is 6201130364722

console.log("part 1:", sum) 



i = disk2.length -1
while( i> 0){
  
  let end = disk2.at(i)
  //console.log("working nums:", end)
  if( isNaN(end[1])){
      i--
      continue
  }
  
  for(let j = 0; j < i; j++){
    if(isNaN(disk2[j][1])){
      
      if(disk2[j][0] == end[0]){
        disk2.splice(j, 1, [ end[0], end[1]])
        end[1]  = NaN
        break
      }
      else if(disk2[j][0] > end[0]){
        disk2.splice(j, 1, [end[0], end[1]],[disk2[j][0] - end[0], disk2[j][1]])
        end[1]  = NaN
        break
      }
    }
  }
  combineNans(disk2)
  //console.log(disk2.map(r=>Array(r[0]).fill(isNaN(r[1]) ? "." : r[1]).join("")).join(""))
  // console.log("disk:",disk2)

  i--

}

function combineNans(arr){
  for(let i=arr.length-2;i>=0;i--){
    if(isNaN(arr[i][1]) && isNaN(arr[i+1][1])){
      arr.splice(i,2,[arr[i][0]+arr[i+1][0],arr[i][1]])
    }
  }
}

const flattened = disk2.map(r => Array(r[0]).fill(isNaN(r[1]) ? 0 : r[1])).flat(1)

console.log("part 2:", flattened.reduce((a, b,i) => a + b*i, 0))

// not 2858  

//83782137258 is too low