import {
  NodeG,
  Model,
  Array,
  BitVec,
  NodeT,
  Const,
  Read,
  NodeR,
  Write,
  Operation,
  Next,
  Ite,
  Not,
  State,
  Input,
  Bad,
  Ext,
} from "./Types";

export default class ModelBuilder {
  #nodes;
  #sorts: NodeT[];
  #roots: (Bad | Next)[];

  constructor(text: string) {
    this.#nodes = new Map<number, NodeG>();
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
    let node: NodeG;

    switch (inst) {
      case "sort":
        if (operands[0] === "bitvec") {
          const bv: BitVec = {
            nid,
            name: operands.slice(3).join(" "),
            size: parseInt(operands[1]),
          };
          this.#sorts.push(bv);
          node = bv;
        } else if (operands[0]) {
          const a: Array = {
            nid,
            name: operands.slice(4).join(" "),
            size: this.#lookupSort(parseInt(operands[1])),
            address: this.#lookupSort(parseInt(operands[2])),
          };
          this.#sorts.push(a);
          node = a;
        } else throw new Error(`Invalid sort: ${operands[0]}`);
        break;
      case "constd":
        const c: Const = {
          nid,
          sort: this.#lookupSort(parseInt(operands[0])),
          imm: parseInt(operands[1]),
        };
        node = c;
        break;
      case "read":
        const r: Read = {
          nid,
          sort: this.#lookupSort(parseInt(operands[0])),
          memory: this.#lookupNode(parseInt(operands[1])),
          address: this.#lookupNode(parseInt(operands[2])),
        };
        node = r;
        break;
      case "write":
        const w: Write = {
          nid,
          sort: this.#lookupSort(parseInt(operands[0])),
          memory: this.#lookupNode(parseInt(operands[1])),
          address: this.#lookupNode(parseInt(operands[2])),
          value: this.#lookupNode(parseInt(operands[3])),
        };
        node = w;
        break;
      case "add":
      case "sub":
      case "mul":
      case "udiv":
      case "urem":
      case "ult":
      case "eq":
      case "and":
        const n: Operation = {
          nid,
          sort: this.#lookupSort(parseInt(operands[0])),
          left: this.#lookupNode(parseInt(operands[1])),
          right: this.#lookupNode(parseInt(operands[2])),
        };
        node = n;
        break;
      case "uext":
        const ex: Ext = {
          nid,
          sort: this.#lookupSort(parseInt(operands[0])),
          from: this.#lookupNode(parseInt(operands[1])),
          value: parseInt(operands[2]),
        };
        node = ex;
        break;
      case "ite":
        const i: Ite = {
          nid,
          sort: this.#lookupSort(parseInt(operands[0])),
          cond: this.#lookupNode(parseInt(operands[1])),
          left: this.#lookupNode(parseInt(operands[2])),
          right: this.#lookupNode(parseInt(operands[3])),
        };
        node = i;
        break;
      case "not":
        const nt: Not = {
          nid,
          sort: this.#lookupSort(parseInt(operands[0])),
          value: this.#lookupNode(parseInt(operands[1])),
        };
        node = nt;
        break;
      case "state":
        const s: State = {
          nid,
          sort: this.#lookupSort(parseInt(operands[0])),
          name: operands.slice(1).join(" "),
        };
        node = s;
        break;
      case "init":
        (this.#lookupNode(parseInt(operands[1])) as State).init =
          this.#lookupNode(parseInt(operands[2]));
        return;
      case "input":
        const inp: Input = {
          nid,
          sort: this.#lookupSort(parseInt(operands[0])),
          name: operands.slice(1).join(" "),
        };
        node = inp;
        break;
      case "bad":
        const b: Bad = {
          nid,
          cond: this.#lookupNode(parseInt(operands[0])),
          name: operands.slice(1).join(" "),
        };
        this.#roots.push(b);
        node = b;
        break;
      case "next":
        const nx: Next = {
          nid,
          sort: this.#lookupSort(parseInt(operands[0])),
          state: this.#lookupNode(parseInt(operands[1])),
          next: this.#lookupNode(parseInt(operands[2])),
        };
        this.#roots.push(nx);
        node = nx;
        break;
      default:
        throw new Error(`Unknown instruction: ${inst}`);
    }

    this.#nodes.set(nid, node);
  }

  #lookupSort(nid: number): NodeT {
    const node = this.#nodes.get(nid);
    if (!node) throw new Error(`Node with nid=${nid} not found`);

    return node as NodeT;
  }

  #lookupNode(nid: number): NodeR {
    const node = this.#nodes.get(nid);
    if (!node) throw new Error(`Node with nid=${nid} not found`);

    return node as NodeR;
  }
}
