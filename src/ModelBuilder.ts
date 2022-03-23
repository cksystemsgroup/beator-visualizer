import {
  GenericNode,
  BitVecArray,
  BitVector,
  Const,
  Read,
  Write,
  Next,
  Ite,
  Not,
  State,
  Input,
  Bad,
  Ext,
  TypeNode,
  And,
  Eq,
  Ult,
  Rem,
  Div,
  Mul,
  Sub,
  Add,
  InstructionNode,
  Operation,
} from "./NodeTypes";

export default class ModelBuilder {
  #nodes;
  #sorts: TypeNode[];
  #rootsDag: (Bad | Next)[];
  #rootsPre: State[];

  constructor(text: string) {
    this.#nodes = new Map<number, GenericNode>();
    this.#sorts = [];
    this.#rootsDag = [];
    this.#rootsPre = [];

    const lines = text.split("\n");
    console.log(lines);
    lines.forEach((x) => this.processLine(x));
    console.log(this.#nodes);
    console.log(this.#sorts);
    console.log(this.#rootsDag);
    console.log(this.#rootsPre);
  }

  private processLine(line: string) {
    if (line.startsWith(";")) return;
    if (line === "") return;

    this.#nodes.set(...this.createNode(line));
  }

  private createNode(line: string): [number, GenericNode] {
    const [nidStr, inst, ...operands] = line.split(" ");
    const nid = parseInt(nidStr);

    switch (inst) {
      case "sort":
        return [nid, this.sortNode(nid, operands)];
      case "constd":
        return [nid, this.constNode(nid, operands)];
      case "read":
        return [nid, this.readNode(nid, operands)];
      case "write":
        return [nid, this.writeNode(nid, operands)];
      case "add":
        return [nid, this.opNode<Add>(nid, operands)];
      case "sub":
        return [nid, this.opNode<Sub>(nid, operands)];
      case "mul":
        return [nid, this.opNode<Mul>(nid, operands)];
      case "udiv":
        return [nid, this.opNode<Div>(nid, operands)];
      case "urem":
        return [nid, this.opNode<Rem>(nid, operands)];
      case "ult":
        return [nid, this.opNode<Ult>(nid, operands)];
      case "eq":
        return [nid, this.opNode<Eq>(nid, operands)];
      case "and":
        return [nid, this.opNode<And>(nid, operands)];
      case "uext":
        return [nid, this.extNode(nid, operands)];
      case "ite":
        return [nid, this.iteNode(nid, operands)];
      case "not":
        return [nid, this.notNode(nid, operands)];
      case "state":
        return [nid, this.stateNode(nid, operands)];
      case "init":
        const init = this.lookupNode(parseInt(operands[1])) as State;
        init.init = this.lookupNode(parseInt(operands[2]));
        this.#rootsPre.push(init);
        return [init.nid, init];
      case "input":
        return [nid, this.inputNode(nid, operands)];
      case "bad":
        return [nid, this.badNode(nid, operands)];
      case "next":
        return [nid, this.nextNode(nid, operands)];
      default:
        throw new Error(`Unknown instruction: ${inst}`);
    }
  }

  private lookupSort(nid: number): TypeNode {
    const node = this.#nodes.get(nid);
    if (!node) throw new Error(`Node with nid=${nid} not found`);

    return node as TypeNode;
  }

  private lookupNode(nid: number): InstructionNode {
    const node = this.#nodes.get(nid);
    if (!node) throw new Error(`Node with nid=${nid} not found`);

    return node as InstructionNode;
  }

  private opNode<T extends Operation>(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    return new Operation(
      nid,
      this.lookupSort(ops[0]),
      this.lookupNode(ops[1]),
      this.lookupNode(ops[2])
    ) as T;
  }

  private nextNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    const node = new Next(
      nid,
      this.lookupSort(ops[0]),
      this.lookupNode(ops[1]),
      this.lookupNode(ops[2])
    );
    this.#rootsDag.push(node as Next);
    return node;
  }

  private badNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    const node = new Bad(
      nid,
      this.lookupNode(ops[0]),
      operands.slice(1).join(" ")
    );
    this.#rootsDag.push(node as Bad);
    return node;
  }

  private inputNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    return new Input(nid, this.lookupSort(ops[0]), operands.slice(1).join(" "));
  }

  private stateNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    return new State(nid, this.lookupSort(ops[0]), operands.slice(1).join(" "));
  }

  private notNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    return new Not(nid, this.lookupSort(ops[0]), this.lookupNode(ops[1]));
  }

  private iteNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    return new Ite(
      nid,
      this.lookupSort(ops[0]),
      this.lookupNode(ops[1]),
      this.lookupNode(ops[2]),
      this.lookupNode(ops[3])
    );
  }

  private extNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    return new Ext(
      nid,
      this.lookupSort(ops[0]),
      this.lookupNode(ops[1]),
      ops[2]
    );
  }

  private writeNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    return new Write(
      nid,
      this.lookupSort(ops[0]),
      this.lookupNode(ops[1]),
      this.lookupNode(ops[2]),
      this.lookupNode(ops[3])
    );
  }

  private readNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    return new Read(
      nid,
      this.lookupSort(ops[0]),
      this.lookupNode(ops[1]),
      this.lookupNode(ops[2])
    );
  }

  private constNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    return new Const(nid, this.lookupSort(ops[0]), ops[1]);
  }

  private sortNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    let node;

    if (operands[0] === "bitvec") {
      node = new BitVector(nid, operands.slice(3).join(" "), ops[1]);
      this.#sorts.push(node as TypeNode);
    } else if (operands[0]) {
      node = new BitVecArray(
        nid,
        operands.slice(4).join(" "),
        this.lookupSort(ops[1]),
        this.lookupSort(ops[2])
      );
      this.#sorts.push(node as TypeNode);
    } else throw new Error(`Invalid sort: ${operands[0]}`);
    return node;
  }
}
