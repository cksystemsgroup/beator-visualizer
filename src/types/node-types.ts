export class ModelNode {
  readonly stats: Stats = {
    depth: -Infinity,
    height: Infinity,
    dependancy: new Dependancy(),
  };

  index: number;

  collapsed = true;
  radius = 10;
  x = 0;
  y = 0;
  onPath = false;

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
    this.onPath = false;
  }
}

export enum NodeType {
  Constant = "Constant",
  Read = "Read",
  Write = "Write",
  Addition = "Addition",
  Subtraction = "Subtraction",
  Multiplication = "Multiplication",
  Division = "Division",
  Remainder = "Remainder",
  LessThan = "LessThan",
  Extend = "Extend",
  IfThenElse = "IfThenElse",
  And = "And",
  Not = "Not",
  Equals = "Equals",
  Input = "Input",
  Bad = "Bad",
  State = "State",
  Next = "Next",
  Sort = "Sort",
  Initialization = "Initialization",
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
  height: number;
  dependancy: Dependancy;
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

export class Dependancy {
  [k: string]: Set<ModelNode>;
  Constant = new Set<ModelNode>();
  Read = new Set<ModelNode>();
  Write = new Set<ModelNode>();
  Addition = new Set<ModelNode>();
  Subtraction = new Set<ModelNode>();
  Multiplication = new Set<ModelNode>();
  Division = new Set<ModelNode>();
  Remainder = new Set<ModelNode>();
  LessThan = new Set<ModelNode>();
  Extend = new Set<ModelNode>();
  IfThenElse = new Set<ModelNode>();
  And = new Set<ModelNode>();
  Not = new Set<ModelNode>();
  Equals = new Set<ModelNode>();
  Input = new Set<ModelNode>();
  Bad = new Set<ModelNode>();
  State = new Set<ModelNode>();
  Next = new Set<ModelNode>();
  Sort = new Set<ModelNode>();
  Initialization = new Set<ModelNode>();
}

export type NodeTypeMap = { [key: string]: NodeType };
export type SortTypeMap = { [key: string]: SortType };
