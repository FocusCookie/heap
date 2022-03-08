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
interface DrawingNode {
  type?: "line" | "node";
  node: LeveledNode;
  variant: "head" | "normal" | "insert";
  diameter: number;
  x: number;
  y: number;
  key: string;
}

export type { Node, Step, LeveledNode, DrawingNode };
