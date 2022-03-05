interface Node {
  id: string;
  value: number;
}

interface Step {
  action: string;
  nodes: Node[];
}

export type { Node, Step };
