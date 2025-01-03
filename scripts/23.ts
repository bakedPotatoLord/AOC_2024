import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2 } from './helpers'

const raw = (await getInput(23))
  .split("\n")
.map(l=>l.split("-"))

const map = new Map<string, Set<string>>()

for(let l of raw){
  // console.log(l)
  if(!map.has(l[0])) map.set(l[0],new Set([l[1]]))
  else map.get(l[0]).add(l[1])
  if(!map.has(l[1])) map.set(l[1],new Set([l[0]]))
  else map.get(l[1]).add(l[0])
}


let sets:string[][] = []

function rec(start:string,curr:string,depth:number,set:string[]){
  if(depth == 3) return

  for(let l of map.get(curr)){ //iterate over neighbours
    if( depth == 2 && l == start){
      sets.push([...set,l])
      continue
    }
    rec(start,l,depth+1,[...set,l])
  }
}

for(let k of map.keys()){
  if(k.startsWith("t")) rec(k,k,0,[])
}

for(let s of sets){
  s.sort()
}

let s = new Set(sets.map(s=>s.join(",")))

console.log("part 1:",s.size)


//need to brainstorm for p2
// run BFS from each node
//only add node to que if it is connected to all other nodes

let groups:Set<string>[] = []

for(let k of map.keys()){
  let group = new Set<string>([k])
  let visited = new Set<string>()
  let q = [k]

  while(q.length > 0){
    let next = q.shift()
    if(visited.has(next)) continue
    visited.add(next)
    for(let l of map.get(next)){
      const connections = map.get(l)
      if(setContained(group,connections)){
        group.add(l)
        q.push(l)
        // console.log("added",l)
      }
    }
  }
  groups.push(group)
}

function setContained(main:Set<string>,container:Set<string>){
  for(let s of main){
    if(!container.has(s)) return false
  }
  return true
}

groups.sort((a,b)=>{
  return b.size-a.size
})
console.log("part 2:",Array.from(groups[0]).sort().join(","))
