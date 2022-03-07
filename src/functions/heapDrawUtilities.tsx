import { Node, LeveledNode } from "../interfaces/heap";

function getRangeForLevel(level: number): number {
  let result: number = 1;

  for (let i: number = 0; i <= level; i++) result = Math.pow(2, i + 1);

  return result - 2;
}

function addLevels(heap: Node[]): LeveledNode[] {
  if (heap.length === 0) return [];

  const leveledHeap = heap.map((node) => Object.assign({ level: 1 }, node));

  let level: number = 0;
  let index: number = 0;
  let reachedHeapEnd: boolean = false;

  while (!reachedHeapEnd) {
    let range: number = getRangeForLevel(level);

    console.log(`${index} <= ${range} =  ${index <= range}`);

    if (index <= range) {
      leveledHeap[index].level = level;
      if (index < heap.length - 1) {
        index++;
      } else {
        reachedHeapEnd = true;
      }
    } else {
      level++;
    }
  }

  return leveledHeap;
}

const heapDrawUtilities = { addLevels };

export default heapDrawUtilities;
