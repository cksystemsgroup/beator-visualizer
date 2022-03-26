import Model from "./Model";
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

export default function processLine(line: string, model: Model) {
  function createNode(line: string): [number, GenericNode] {
    const [nidStr, inst, ...operands] = line.split(" ");
    const nid = parseInt(nidStr);

    switch (inst) {
      case "sort":
        return [nid, sortNode(nid, operands)];
      case "constd":
        return [nid, constNode(nid, operands)];
      case "read":
        return [nid, readNode(nid, operands)];
      case "write":
        return [nid, writeNode(nid, operands)];
      case "add":
        return [nid, opNode<Add>(nid, operands)];
      case "sub":
        return [nid, opNode<Sub>(nid, operands)];
      case "mul":
        return [nid, opNode<Mul>(nid, operands)];
      case "udiv":
        return [nid, opNode<Div>(nid, operands)];
      case "urem":
        return [nid, opNode<Rem>(nid, operands)];
      case "ult":
        return [nid, opNode<Ult>(nid, operands)];
      case "eq":
        return [nid, opNode<Eq>(nid, operands)];
      case "and":
        return [nid, opNode<And>(nid, operands)];
      case "uext":
        return [nid, extNode(nid, operands)];
      case "ite":
        return [nid, iteNode(nid, operands)];
      case "not":
        return [nid, notNode(nid, operands)];
      case "state":
        return [nid, stateNode(nid, operands)];
      case "init":
        const init = lookupNode(parseInt(operands[1])) as State;
        init.init = lookupNode(parseInt(operands[2]));
        model.rootsPre.push(init);
        return [init.nid, init];
      case "input":
        return [nid, inputNode(nid, operands)];
      case "bad":
        return [nid, badNode(nid, operands)];
      case "next":
        return [nid, nextNode(nid, operands)];
      default:
        throw new Error(`Unknown instruction: ${inst}`);
    }
  }

  function lookupSort(nid: number): TypeNode {
    const node = model.nodes.get(nid);
    if (!node) throw new Error(`Node with nid=${nid} not found`);

    return node as TypeNode;
  }

  function lookupNode(nid: number): InstructionNode {
    const node = model.nodes.get(nid);
    if (!node) throw new Error(`Node with nid=${nid} not found`);

    return node as InstructionNode;
  }

  function opNode<T extends Operation>(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    return new Operation(
      nid,
      lookupSort(ops[0]),
      lookupNode(ops[1]),
      lookupNode(ops[2])
    ) as T;
  }

  function nextNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    const node = new Next(
      nid,
      lookupSort(ops[0]),
      lookupNode(ops[1]),
      lookupNode(ops[2])
    );
    model.rootsDag.push(node as Next);
    return node;
  }

  function badNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    const node = new Bad(nid, lookupNode(ops[0]), operands.slice(1).join(" "));
    model.rootsDag.push(node);
    model.bads.push(node);
    return node;
  }

  function inputNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    return new Input(nid, lookupSort(ops[0]), operands.slice(1).join(" "));
  }

  function stateNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    return new State(nid, lookupSort(ops[0]), operands.slice(1).join(" "));
  }

  function notNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    return new Not(nid, lookupSort(ops[0]), lookupNode(ops[1]));
  }

  function iteNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    return new Ite(
      nid,
      lookupSort(ops[0]),
      lookupNode(ops[1]),
      lookupNode(ops[2]),
      lookupNode(ops[3])
    );
  }

  function extNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    return new Ext(nid, lookupSort(ops[0]), lookupNode(ops[1]), ops[2]);
  }

  function writeNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    return new Write(
      nid,
      lookupSort(ops[0]),
      lookupNode(ops[1]),
      lookupNode(ops[2]),
      lookupNode(ops[3])
    );
  }

  function readNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    return new Read(
      nid,
      lookupSort(ops[0]),
      lookupNode(ops[1]),
      lookupNode(ops[2])
    );
  }

  function constNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    return new Const(nid, lookupSort(ops[0]), ops[1]);
  }

  function sortNode(nid: number, operands: string[]) {
    const ops = operands.map((x) => (parseInt(x) ? parseInt(x) : -1));
    let node;

    if (operands[0] === "bitvec") {
      node = new BitVector(nid, operands.slice(3).join(" "), ops[1]);
      model.sorts.push(node as TypeNode);
    } else if (operands[0]) {
      node = new BitVecArray(
        nid,
        operands.slice(4).join(" "),
        lookupSort(ops[1]),
        lookupSort(ops[2])
      );
      model.sorts.push(node as TypeNode);
    } else throw new Error(`Invalid sort: ${operands[0]}`);
    return node;
  }

  if (line.startsWith(";")) return;
  if (line === "") return;

  model.nodes.set(...createNode(line));
}
