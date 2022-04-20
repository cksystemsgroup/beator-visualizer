export class ModelNode {
  #type;
  #parents;
  #nid;
  #immediate;
  #name;

  #stats: Stats;
  #view: View;

  constructor(
    nid: number,
    type: NodeType,
    parents: ModelNode[],
    immediate?: number,
    name?: string
  ) {
    this.#nid = nid;
    this.#type = type;
    this.#parents = parents;
    this.#immediate = immediate;
    this.#name = name;

    this.#stats = {
      dagDepth: 0,
      iniDepth: 0,
      dagEntanglement: 0,
      iniEntanglement: 0,
    };

    this.#view = {
      collapsed: true,
    };
  }

  get nid() {
    return this.#nid;
  }

  get type() {
    return this.#type;
  }

  get parents() {
    return this.#parents;
  }

  get immediate() {
    if (!this.#immediate) throw new Error("Illegal immediate access");

    return this.#immediate!;
  }

  get stats() {
    return this.#stats;
  }

  get view() {
    return this.#view;
  }

  get name() {
    if (this.#name) return this.#name;
    return this.#type;
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
