import {getInput, numberSum} from './helpers'

const raw = (await getInput(7))
.split("\n")
.map(l=>l.split(": "))
.map((l)=>[Number(l[0]),l[1].split(" ").map(Number)])

//console.log(raw)

const filtered = raw.filter((el)=>{
  const collector:number[] = []

  getTypes(null,el[1])

  const res = collector

  const hasit = res.some(r=>r == el[0])

  if(el[0] == 292) console.log(collector,res)


  return hasit
  function getTypes(num:number|null,more:number[]) {
    if(more.length == 0) collector.push(num)
    else {
      more = structuredClone(more)
      if(num == null){
        getTypes(more[0],more.slice(1))        
      }
      else{
        getTypes(num * more[0],more.slice(1))
        getTypes(num + more[0],more.slice(1))
      } 
    }

  }

})


console.log("part 1: ",numberSum(filtered.map(f=>f[0])))

//not 376

const filtered2 = raw.filter((el)=>{
  const collector:number[] = []

  getTypes(null,el[1])

  const res = collector

  const hasit = res.some(r=>r == el[0])

  if(el[0] == 292) console.log(collector,res)


  return hasit
  function getTypes(num:number|null,more:number[]) {
    if(more.length == 0) collector.push(num)
    else {
      more = structuredClone(more)
      if(num == null){
        getTypes(more[0],more.slice(1))        
      }
      else{
        getTypes(num * more[0],more.slice(1))
        getTypes(num + more[0],more.slice(1))
        getTypes(Number(num.toString() + more[0].toString()),more.slice(1))

      } 
    }

  }

})

console.log("part 2: ",numberSum(filtered2.map(f=>f[0])))

