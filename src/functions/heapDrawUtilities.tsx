import { Node, LeveledNode } from "../interfaces/heap";

function getRangeForLevel(level: number): number {
  let result: number = 1;

  for (let i: number = 0; i <= level; i++) result = Math.pow(2, i + 1);

  return result - 2;
}

function addLevels(heap: Node[]): LeveledNode[] {
  if (heap.length === 0) return [];

  const leveledHeap = heap.map((node) => Object.assign({ level: -1 }, node));

  let level: number = 0;
  let index: number = 0;
  let reachedHeapEnd: boolean = false;

  while (!reachedHeapEnd) {
    let range: number = getRangeForLevel(level);

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

function sortedByLevel(heap: LeveledNode[]) {
  if (heap.length === 0) return [];

  return heap.reduce((acc: any, curr: any) => {
    if (!acc[curr.level]) acc[curr.level] = [];
    acc[curr.level].push(curr);
    return acc;
  }, []);
}

const heapDrawUtilities = { addLevels, sortedByLevel };

export default heapDrawUtilities;
