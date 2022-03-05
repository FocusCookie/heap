interface Coordinates {
  x: number;
  y: number;
}

interface Node {
  id: string;
  value: number;
  coordinates: Coordinates;
}

interface Step {
  action: string;
  nodes: Node[];
}

export type { Coordinates, Node, Step };
