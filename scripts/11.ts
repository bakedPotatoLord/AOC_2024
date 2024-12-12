import { getInput, numberSum } from './helpers'

const raw = (await getInput(11))
  .split(" ")
  .map(Number)

const map = new Map<string, number>()

const rawCopy = structuredClone(raw)

const p1 = raw.reduce((a, b) => a + process(b, 25), 0)

console.log("part 1", p1)


function process(num:number, blinksLeft:number) {
  if (blinksLeft === 0) return 1;
  const key = `${num}|${blinksLeft}`;
  if (map.has(key)) return map.get(key);
  let res = 0;
  if (num === 0) {
    res = process(1, blinksLeft - 1);
  } else if (num.toString().length % 2 === 0) {
    const string = num.toString();
    const mid = string.length / 2;
    const left = Number(string.slice(0, mid));
    const right = Number(string.slice(mid));
    res = process(left, blinksLeft - 1) + process(right, blinksLeft - 1);
  } else {
    res = process(num * 2024, blinksLeft - 1);
  }

  map.set(key, res)
  return res;
}

const total = rawCopy.reduce((a, b) => a + process(b, 75), 0);

console.log("part 2", total);