export class ModelNode {
  readonly stats: Stats;
  view: View;

  constructor(
    readonly nid: number,
    readonly type: NodeType,
    readonly parents: ModelNode[],
    readonly sort: SortType,
    readonly immediate?: number,
    readonly name?: string
  ) {
    this.stats = {
      depth: 0,
      dependancy: 0,
    };

    this.view = {
      collapsed: true,
      index: nid,
      radius: 10,
      x: 0,
      y: 0,
    };
  }

  get id() {
    return this.nid;
  }

  get index() {
    return this.view.index;
  }

  set index(v) {
    this.view.index = v;
  }

  get x() {
    return this.view.x;
  }

  set x(v) {
    this.view.x = v;
  }

  get y() {
    return this.view.y;
  }

  set y(v) {
    this.view.y = v;
  }

  get radius() {
    return this.view.radius;
  }

  set radius(v) {
    this.view.radius = v;
  }

  get collapsed() {
    return this.view.collapsed;
  }

  set collapsed(v) {
    this.view.collapsed = v;
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

interface View {
  collapsed: boolean;
  index: number;
  x: number;
  y: number;
  radius: number;
}
