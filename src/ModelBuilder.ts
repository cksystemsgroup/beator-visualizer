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
    lines.forEach((x) => this.#createNodeG(x));
    console.log(this.#nodes);
    console.log(this.#sorts);
    console.log(this.#roots);
  }

  get model(): Model {
    return {
      nodes: this.#nodes,
      sorts: [],
      roots: [],
    };
  }

  #createNodeG(line: string) {
    if (line.startsWith(";")) return;
    if (line === "") return;

    let [nidStr, inst, ...operands] = line.split(" ");
    const nid = parseInt(nidStr);
    let node: GenericNode;

    // TODO: move into own method and simplify constructors
    switch (inst) {
      case "sort":
        if (operands[0] === "bitvec") {
          node = new BitVector(
            nid,
            operands.slice(3).join(" "),
            parseInt(operands[1])
          );
          this.#sorts.push(node as TypeNode);
        } else if (operands[0]) {
          node = new BitVecArray(
            nid,
            operands.slice(4).join(" "),
            this.lookupSort(parseInt(operands[1])),
            this.lookupSort(parseInt(operands[2]))
          );
          this.#sorts.push(node as TypeNode);
        } else throw new Error(`Invalid sort: ${operands[0]}`);
        break;
      case "constd":
        node = new Const(
          nid,
          this.lookupSort(parseInt(operands[0])),
          parseInt(operands[1])
        );
        break;
      case "read":
        node = new Read(
          nid,
          this.lookupSort(parseInt(operands[0])),
          this.lookupNode(parseInt(operands[1])),
          this.lookupNode(parseInt(operands[2]))
        );
        break;
      case "write":
        node = new Write(
          nid,
          this.lookupSort(parseInt(operands[0])),
          this.lookupNode(parseInt(operands[1])),
          this.lookupNode(parseInt(operands[2])),
          this.lookupNode(parseInt(operands[3]))
        );
        break;
      case "add":
        node = new Add(
          nid,
          this.lookupSort(parseInt(operands[0])),
          this.lookupNode(parseInt(operands[1])),
          this.lookupNode(parseInt(operands[2]))
        );
        break;
      case "sub":
        node = new Sub(
          nid,
          this.lookupSort(parseInt(operands[0])),
          this.lookupNode(parseInt(operands[1])),
          this.lookupNode(parseInt(operands[2]))
        );
        break;
      case "mul":
        node = new Mul(
          nid,
          this.lookupSort(parseInt(operands[0])),
          this.lookupNode(parseInt(operands[1])),
          this.lookupNode(parseInt(operands[2]))
        );
        break;
      case "udiv":
        node = new Div(
          nid,
          this.lookupSort(parseInt(operands[0])),
          this.lookupNode(parseInt(operands[1])),
          this.lookupNode(parseInt(operands[2]))
        );
        break;
      case "urem":
        node = new Rem(
          nid,
          this.lookupSort(parseInt(operands[0])),
          this.lookupNode(parseInt(operands[1])),
          this.lookupNode(parseInt(operands[2]))
        );
        break;
      case "ult":
        node = new Ult(
          nid,
          this.lookupSort(parseInt(operands[0])),
          this.lookupNode(parseInt(operands[1])),
          this.lookupNode(parseInt(operands[2]))
        );
        break;
      case "eq":
        node = new Eq(
          nid,
          this.lookupSort(parseInt(operands[0])),
          this.lookupNode(parseInt(operands[1])),
          this.lookupNode(parseInt(operands[2]))
        );
        break;
      case "and":
        node = new And(
          nid,
          this.lookupSort(parseInt(operands[0])),
          this.lookupNode(parseInt(operands[1])),
          this.lookupNode(parseInt(operands[2]))
        );
        break;
      case "uext":
        node = new Ext(
          nid,
          this.lookupSort(parseInt(operands[0])),
          this.lookupNode(parseInt(operands[1])),
          parseInt(operands[2])
        );
        break;
      case "ite":
        node = new Ite(
          nid,
          this.lookupSort(parseInt(operands[0])),
          this.lookupNode(parseInt(operands[1])),
          this.lookupNode(parseInt(operands[2])),
          this.lookupNode(parseInt(operands[3]))
        );
        break;
      case "not":
        node = new Not(
          nid,
          this.lookupSort(parseInt(operands[0])),
          this.lookupNode(parseInt(operands[1]))
        );
        break;
      case "state":
        node = new State(
          nid,
          this.lookupSort(parseInt(operands[0])),
          operands.slice(1).join(" ")
        );
        break;
      case "init":
        (this.lookupNode(parseInt(operands[1])) as State).init =
          this.lookupNode(parseInt(operands[2]));
        return;
      case "input":
        node = new Input(
          nid,
          this.lookupSort(parseInt(operands[0])),
          operands.slice(1).join(" ")
        );
        break;
      case "bad":
        node = new Bad(
          nid,
          this.lookupNode(parseInt(operands[0])),
          operands.slice(1).join(" ")
        );
        this.#roots.push(node as Bad);
        break;
      case "next":
        node = new Next(
          nid,
          this.lookupSort(parseInt(operands[0])),
          this.lookupNode(parseInt(operands[1])),
          this.lookupNode(parseInt(operands[2]))
        );
        this.#roots.push(node as Next);
        break;
      default:
        throw new Error(`Unknown instruction: ${inst}`);
    }

    this.#nodes.set(nid, node);
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
