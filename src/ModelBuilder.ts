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
} from "./NodeTypes";

export default class ModelBuilder {
  #nodes;
  #sorts: TypeNode[];
  #roots: (Bad | Next)[];

  constructor(text: string) {
    this.#nodes = new Map<number, GenericNode>();
    this.#sorts = [];
    this.#roots = [];

    const lines = text.split("\n");
    console.log(lines);
    lines.forEach((x) => this.processLine(x));
    console.log(this.#nodes);
    console.log(this.#sorts);
    console.log(this.#roots);
  }

  get model(): Model {
    return {
      nodes: this.#nodes,
      sorts: this.#sorts,
      roots: this.#roots,
    };
  }

  private processLine(line: string) {
    if (line.startsWith(";")) return;
    if (line === "") return;

    this.#nodes.set(...this.createNode(line));
  }

  private createNode(line: string): [number, GenericNode] {
    const [nidStr, inst, ...operands] = line.split(" ");
    const [nid, ops] = [
      parseInt(nidStr),
      operands.map((x) => (parseInt(x) ? parseInt(x) : -1)),
    ];

    let node: GenericNode;

    switch (inst) {
      case "sort":
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
        break;
      case "constd":
        node = new Const(nid, this.lookupSort(ops[0]), ops[1]);
        break;
      case "read":
        node = new Read(
          nid,
          this.lookupSort(ops[0]),
          this.lookupNode(ops[1]),
          this.lookupNode(ops[2])
        );
        break;
      case "write":
        node = new Write(
          nid,
          this.lookupSort(ops[0]),
          this.lookupNode(ops[1]),
          this.lookupNode(ops[2]),
          this.lookupNode(ops[3])
        );
        break;
      case "add":
        node = new Add(
          nid,
          this.lookupSort(ops[0]),
          this.lookupNode(ops[1]),
          this.lookupNode(ops[2])
        );
        break;
      case "sub":
        node = new Sub(
          nid,
          this.lookupSort(ops[0]),
          this.lookupNode(ops[1]),
          this.lookupNode(ops[2])
        );
        break;
      case "mul":
        node = new Mul(
          nid,
          this.lookupSort(ops[0]),
          this.lookupNode(ops[1]),
          this.lookupNode(ops[2])
        );
        break;
      case "udiv":
        node = new Div(
          nid,
          this.lookupSort(ops[0]),
          this.lookupNode(ops[1]),
          this.lookupNode(ops[2])
        );
        break;
      case "urem":
        node = new Rem(
          nid,
          this.lookupSort(ops[0]),
          this.lookupNode(ops[1]),
          this.lookupNode(ops[2])
        );
        break;
      case "ult":
        node = new Ult(
          nid,
          this.lookupSort(ops[0]),
          this.lookupNode(ops[1]),
          this.lookupNode(ops[2])
        );
        break;
      case "eq":
        node = new Eq(
          nid,
          this.lookupSort(ops[0]),
          this.lookupNode(ops[1]),
          this.lookupNode(ops[2])
        );
        break;
      case "and":
        node = new And(
          nid,
          this.lookupSort(ops[0]),
          this.lookupNode(ops[1]),
          this.lookupNode(ops[2])
        );
        break;
      case "uext":
        node = new Ext(
          nid,
          this.lookupSort(ops[0]),
          this.lookupNode(ops[1]),
          ops[2]
        );
        break;
      case "ite":
        node = new Ite(
          nid,
          this.lookupSort(ops[0]),
          this.lookupNode(ops[1]),
          this.lookupNode(ops[2]),
          this.lookupNode(ops[3])
        );
        break;
      case "not":
        node = new Not(nid, this.lookupSort(ops[0]), this.lookupNode(ops[1]));
        break;
      case "state":
        node = new State(
          nid,
          this.lookupSort(ops[0]),
          operands.slice(1).join(" ")
        );
        break;
      case "init":
        const init = this.lookupNode(ops[1]) as State;
        init.init = this.lookupNode(ops[2]);
        return [init.nid, init];
      case "input":
        node = new Input(
          nid,
          this.lookupSort(ops[0]),
          operands.slice(1).join(" ")
        );
        break;
      case "bad":
        node = new Bad(
          nid,
          this.lookupNode(ops[0]),
          operands.slice(1).join(" ")
        );
        this.#roots.push(node as Bad);
        break;
      case "next":
        node = new Next(
          nid,
          this.lookupSort(ops[0]),
          this.lookupNode(ops[1]),
          this.lookupNode(ops[2])
        );
        this.#roots.push(node as Next);
        break;
      default:
        throw new Error(`Unknown instruction: ${inst}`);
    }

    return [nid, node];
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
}

interface Results {
  nodeNr: number;
  badNr: number;
  stateNr: number;
  istateNr: number;
  dagLen: number;
  unrollLen: number;
  dagPath: number; // TODO: change to path itself
  unrollPath: number; // TODO: change to path itself
  maxEntanglement: number;
}

interface Model {
  nodes: Map<number, GenericNode>;
  sorts: TypeNode[];
  roots: (Bad | Next)[];
}
