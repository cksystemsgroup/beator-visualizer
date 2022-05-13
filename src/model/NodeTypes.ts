export class ModelNode {
  readonly stats: Stats;
  view: View;

  constructor(
    readonly nid: number,
    readonly type: NodeType,
    readonly parents: ModelNode[],
    readonly immediate?: number,
    readonly name?: string
  ) {
    this.stats = {
      depth: 0,
      entanglement: 0,
    };

    this.view = {
      collapsed: true,
      index: nid,
    };
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
  Ult = "Constant",
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

interface Stats {
  pathChild?: ModelNode;
  depth: number;
  entanglement: number;
  entanglers?: ModelNode[];
}

interface View {
  collapsed: boolean;
  index: number;
  x?: number;
  y?: number;
}
