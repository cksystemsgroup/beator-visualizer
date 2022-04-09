export type DagLeaf = State | Input | Const;
export type PreLeaf = Input | Const;

export abstract class GenericNode {
  nid: number;
  longestChild?: GenericNode;
  dagDepth: number;
  preDepth: number;
  dagEntanglement: number;
  preEntanglement: number;
  dagEntanglers?: DagLeaf[];
  preEntanglers?: PreLeaf[];
  collapsed: boolean;
  abstract nodeType: string;

  constructor(nid: number) {
    this.nid = nid;
    this.dagDepth = 0;
    this.dagEntanglement = 0;
    this.preDepth = 0;
    this.preEntanglement = 0;
    this.collapsed = true;
  }
}

export abstract class InstructionNode extends GenericNode {
  #sort: TypeNode;

  constructor(nid: number, sort: TypeNode) {
    super(nid);
    this.#sort = sort;
  }

  get sort() {
    return this.#sort;
  }

  abstract get parents(): (InstructionNode | Bad)[];
}

export abstract class TypeNode extends GenericNode {
  #name: string;

  constructor(nid: number, name: string) {
    super(nid);
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}

export class BitVector extends TypeNode {
  #size: number;
  nodeType: string = "Bit Vector";

  constructor(nid: number, name: string, size: number) {
    super(nid, name);
    this.#size = size;
  }

  get size() {
    return this.#size;
  }
}

export class BitVecArray extends TypeNode {
  #size: TypeNode;
  #address: TypeNode;
  nodeType: string = "Bit Vector Array";

  constructor(nid: number, name: string, size: TypeNode, address: TypeNode) {
    super(nid, name);
    this.#size = size;
    this.#address = address;
  }

  get size() {
    return this.#size;
  }

  get address() {
    return this.#address;
  }
}

export class Const extends InstructionNode {
  #imm: number;
  nodeType: string = "Constant";

  constructor(nid: number, sort: TypeNode, imm: number) {
    super(nid, sort);
    this.#imm = imm;
  }

  get imm() {
    return this.#imm;
  }

  get parents() {
    return [];
  }
}

export class Read extends InstructionNode {
  #memory: InstructionNode;
  #address: InstructionNode;
  nodeType: string = "Read";

  constructor(
    nid: number,
    sort: TypeNode,
    memory: InstructionNode,
    address: InstructionNode
  ) {
    super(nid, sort);
    this.#memory = memory;
    this.#address = address;
  }

  get memory() {
    return this.#memory;
  }

  get address() {
    return this.#address;
  }

  get parents() {
    return [this.#memory, this.#address];
  }
}

export class Write extends InstructionNode {
  #memory: InstructionNode;
  #address: InstructionNode;
  #value: InstructionNode;
  nodeType: string = "Write";

  constructor(
    nid: number,
    sort: TypeNode,
    memory: InstructionNode,
    address: InstructionNode,
    value: InstructionNode
  ) {
    super(nid, sort);
    this.#memory = memory;
    this.#address = address;
    this.#value = value;
  }

  get memory() {
    return this.#memory;
  }

  get address() {
    return this.#address;
  }

  get value() {
    return this.#value;
  }

  get parents() {
    return [this.#memory, this.#address, this.#value];
  }
}

export abstract class Operation extends InstructionNode {
  #left: InstructionNode;
  #right: InstructionNode;

  constructor(
    nid: number,
    sort: TypeNode,
    left: InstructionNode,
    right: InstructionNode
  ) {
    super(nid, sort);
    this.#left = left;
    this.#right = right;
  }

  get left() {
    return this.#left;
  }

  get right() {
    return this.#right;
  }

  get parents() {
    return [this.#left, this.#right];
  }
}

export class Add extends Operation {
  nodeType: string = "Addition";
}

export class Sub extends Operation {
  nodeType: string = "Subtraction";
}

export class Mul extends Operation {
  nodeType: string = "Multiplication";
}

export class Div extends Operation {
  nodeType: string = "Division";
}

export class Rem extends Operation {
  nodeType: string = "Remainder";
}

export class Ult extends Operation {
  nodeType: string = "Less Than";
}

export class Ext extends InstructionNode {
  #from: InstructionNode;
  #value: number;
  nodeType: string = "Extend";

  constructor(
    nid: number,
    sort: TypeNode,
    from: InstructionNode,
    value: number
  ) {
    super(nid, sort);
    this.#from = from;
    this.#value = value;
  }

  get from() {
    return this.#from;
  }

  get value() {
    return this.#value;
  }

  get parents() {
    return [this.#from];
  }
}

export class Ite extends Operation {
  #cond: InstructionNode;
  nodeType: string = "If then else";

  constructor(
    nid: number,
    sort: TypeNode,
    cond: InstructionNode,
    left: InstructionNode,
    right: InstructionNode
  ) {
    super(nid, sort, left, right);
    this.#cond = cond;
  }

  get cond() {
    return this.#cond;
  }

  get parents() {
    return [this.left, this.right, this.#cond];
  }
}

export class Eq extends Operation {
  nodeType: string = "Equals";
}
export class And extends Operation {
  nodeType: string = "And";
}

export class Not extends InstructionNode {
  #value: InstructionNode;
  nodeType: string = "Not";

  constructor(nid: number, sort: TypeNode, value: InstructionNode) {
    super(nid, sort);
    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  get parents() {
    return [this.#value];
  }
}

export class State extends InstructionNode {
  #init?: InstructionNode;
  #name: string;
  nodeType: string = "State";

  constructor(
    nid: number,
    sort: TypeNode,
    name: string,
    init?: InstructionNode
  ) {
    super(nid, sort);
    this.#name = name;
    if (init) this.#init = init;
  }

  get name() {
    return this.#name;
  }

  get init() {
    return this.#init;
  }

  set init(node: InstructionNode | undefined) {
    if (this.#init)
      throw Error(`Trying to redefine inital value of ${this.#name}`);
    this.#init = node;
  }

  get parents() {
    if (!this.#init) {
      return [];
    }

    return [this.#init];
  }
}

export class Next extends InstructionNode {
  #state: InstructionNode;
  #next: InstructionNode;
  nodeType: string = "Next";

  constructor(
    nid: number,
    sort: TypeNode,
    state: InstructionNode,
    next: InstructionNode
  ) {
    super(nid, sort);
    this.#state = state;
    this.#next = next;
  }

  get state() {
    return this.#state;
  }

  get next() {
    return this.#next;
  }

  get parents() {
    return [this.#state, this.#next];
  }
}

export class Input extends InstructionNode {
  #name: string;
  nodeType: string = "Input";

  constructor(nid: number, sort: TypeNode, name: string) {
    super(nid, sort);
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get parents() {
    return [];
  }
}

export class Bad extends GenericNode {
  #cond: InstructionNode;
  #name: string;
  nodeType: string = "Bad";

  constructor(nid: number, cond: InstructionNode, name: string) {
    super(nid);
    this.#cond = cond;
    this.#name = name;
  }

  get cond() {
    return this.#cond;
  }

  get name() {
    return this.#name;
  }

  get parents(): InstructionNode[] {
    return [this.#cond];
  }
}
