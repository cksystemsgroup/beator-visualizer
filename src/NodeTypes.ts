export abstract class GenericNode {
  #nid: number;

  constructor(nid: number) {
    this.#nid = nid;
  }

  get nid() {
    return this.#nid;
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

  constructor(nid: number, sort: TypeNode, imm: number) {
    super(nid, sort);
    this.#imm = imm;
  }

  get imm() {
    return this.#imm;
  }
}

export class Read extends InstructionNode {
  #memory: InstructionNode;
  #address: InstructionNode;

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
}

export class Write extends InstructionNode {
  #memory: InstructionNode;
  #address: InstructionNode;
  #value: InstructionNode;

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
}

export class Operation extends InstructionNode {
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
}

export class Add extends Operation {}

export class Sub extends Operation {}

export class Mul extends Operation {}

export class Div extends Operation {}

export class Rem extends Operation {}

export class Ult extends Operation {}

export class Ext extends InstructionNode {
  #from: InstructionNode;
  #value: number;

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
}

export class Ite extends Operation {
  #cond: InstructionNode;

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
}

export class Eq extends Operation {}
export class And extends Operation {}

export class Not extends InstructionNode {
  #value: InstructionNode;

  constructor(nid: number, sort: TypeNode, value: InstructionNode) {
    super(nid, sort);
    this.#value = value;
  }

  get value() {
    return this.#value;
  }
}

export class State extends InstructionNode {
  #init?: InstructionNode;
  #name: string;

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
}

export class Next extends InstructionNode {
  #state: InstructionNode;
  #next: InstructionNode;

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
}

export class Input extends InstructionNode {
  #name: string;

  constructor(nid: number, sort: TypeNode, name: string) {
    super(nid, sort);
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}

export class Bad extends GenericNode {
  #cond: InstructionNode;
  #name: string;

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
}
