import {getInput, numberSum} from './helpers'

const raw:string = (await getInput(3))


const allReal =  Array.from(raw.matchAll(/mul\([0-9]+,[0-9]+\)/g) )

const arr= allReal.map(a=>a[0].split( /,|\(|\)/ ) )
.map(a=>parseInt(a[1])*parseInt(a[2]))

console.log("part 1:",numberSum(arr)) 


const allDos =  Array.from(raw.matchAll(/do\(\)/g) )
.map(({0:str,index:idx})=>[idx,false,str])
const allDonts =  Array.from(raw.matchAll(/don't\(\)/g) )
.map(({0:str,index:idx})=>[idx,false,str])

const arrindexed = allReal.map(({0:str,index:idx})=>[idx,str.split( /,|\(|\)/ )])
.map(([i,str])=>[i,true,parseInt(str[1])*parseInt(str[2])])

const combined = [...arrindexed,...allDos,...allDonts]

combined.sort((a,b)=>a[0]-b[0])

let score = 0
let doit = true

for(let i of combined){
  if(i[1] && doit){
    score += <number>i[2]
  }else{
    doit = (i[2] == "do()")
  } 
}


console.log("part 2:", score) 

