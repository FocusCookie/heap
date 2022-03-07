interface Node {
  id: string;
  value: number;
}
interface LeveledNode {
  id: string;
  value: number;
  level: number;
}

interface Step {
  action: string;
  nodes: Node[];
}

export type { Node, Step, LeveledNode };
