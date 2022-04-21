export class ModelNode {
  readonly stats: Stats;
  readonly view: View;

  constructor(
    readonly nid: number,
    readonly type: NodeType,
    readonly parents: ModelNode[],
    readonly _immediate?: number,
    readonly _name?: string
  ) {
    this.stats = {
      dagDepth: 0,
      iniDepth: 0,
      dagEntanglement: 0,
      iniEntanglement: 0,
    };

    this.view = {
      collapsed: true,
    };
  }

  get immediate() {
    if (!this._immediate) throw new Error("Illegal immediate access");

    return this._immediate!;
  }

  get name() {
    if (this._name) return this._name;
    return this.type;
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
  longestChild?: ModelNode;
  dagDepth: number;
  iniDepth: number;
  dagEntanglement: number;
  iniEntanglement: number;
  dagEntanglers?: ModelNode[];
  iniEntanglers?: ModelNode[];
}

interface View {
  collapsed: boolean;
}
