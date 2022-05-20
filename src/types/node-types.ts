export class ModelNode {
  readonly stats: Stats = {
    depth: 0,
    dependancy: 0,
  };

  index: number;

  collapsed = true;
  radius = 10;
  x = 0;
  y = 0;

  constructor(
    readonly nid: number,
    readonly nodeClass: NodeType,
    readonly parents: ModelNode[],
    readonly sort: SortType,
    readonly immediate?: number,
    readonly name?: string
  ) {
    this.index = nid;
  }

  get id() {
    return this.nid;
  }

  reset() {
    this.collapsed = true;
    this.index = this.nid;
    this.x = 0;
    this.y = 0;
    this.radius = 10;
  }
}

export enum NodeType {
  Const = "Constant",
  Read = "Read",
  Write = "Write",
  Add = "Addition",
  Sub = "Subtraction",
  Mul = "Multiplication",
  Div = "Division",
  Rem = "Remainder",
  Ult = "Less-than",
  Ext = "Extend",
  Ite = "If-then-else",
  And = "And",
  Not = "Not",
  Eq = "Equals",
  Input = "Input",
  Bad = "Bad",
  State = "State",
  Next = "Next",
  Sort = "Sort",
  Init = "Initialization",
}

export enum SortType {
  Boolean = "Boolean",
  Word = "Machine Word",
  Memory = "Virtual Memory",
  Bytes = "Bytes",
  Clump = "Clump",
}

interface Stats {
  pathChild?: ModelNode;
  depth: number;
  dependancy: number;
  dependants?: ModelNode[];
}

export type ClumpNode = {
  x: number;
  y: number;
  radius: number;
  nodeClass: string;
  id: string;
  size: number;
  sort: SortType.Clump;
  minDepth: number;
  maxDepth: number;
};
