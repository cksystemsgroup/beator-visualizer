import { Model } from "../types/model-types";
import {
  ModelNode,
  NodeType,
  NodeTypeMap,
  SortType,
  SortTypeMap,
} from "../types/node-types";

const NODE_TYPES: NodeTypeMap = {
  sort: NodeType.Sort,
  constd: NodeType.Const,
  read: NodeType.Read,
  write: NodeType.Write,
  add: NodeType.Add,
  sub: NodeType.Sub,
  mul: NodeType.Mul,
  udiv: NodeType.Div,
  urem: NodeType.Rem,
  ult: NodeType.Ult,
  eq: NodeType.Eq,
  and: NodeType.And,
  uext: NodeType.Ext,
  ite: NodeType.Ite,
  not: NodeType.Not,
  state: NodeType.State,
  init: NodeType.Init,
  input: NodeType.Input,
  bad: NodeType.Bad,
  next: NodeType.Next,
};

const SORT_TYPES: SortTypeMap = {
  bytes: SortType.Bytes,
  byte: SortType.Bytes,
  word: SortType.Word,
  memory: SortType.Memory,
  Boolean: SortType.Boolean,
};

export default function processLine(line: string, model: Model) {
  const createNode = (line: string): [number, ModelNode] | undefined => {
    const [nidStr, inst, ...operands] = line.split(" ");
    const nid = parseInt(nidStr);
    const type = getClass(inst);

    if (type === NodeType.Sort) {
      model.sortMap.set(nid, getSort(operands.at(-1)!));
      return;
    }

    const node = new ModelNode(nid, type, ...getParameters(type, operands));

    if (type === NodeType.Next || type === NodeType.Bad) model.roots.push(node);

    return [nid, node];
  };

  function getParameters(
    type: NodeType,
    operands: string[]
  ): [ModelNode[], SortType, number?, string?] {
    if (type === NodeType.Const)
      return [
        [],
        model.sortMap.get(parseInt(operands[0]))!,
        parseInt(operands[1]),
      ];
    if (type === NodeType.State || type === NodeType.Input) {
      return [
        operands.slice(1, -1).map((x) => model.nodes.get(parseInt(x))!),
        model.sortMap.get(parseInt(operands[0]))!,
        undefined,
        operands.at(-1),
      ];
    } else if (type === NodeType.Bad) {
      return [
        operands.slice(0, -1).map((x) => model.nodes.get(parseInt(x))!),
        model.sortMap.get(parseInt(operands[0]))!,
        undefined,
        operands.at(-1),
      ];
    } else if (type === NodeType.Ext) {
      return [
        operands.slice(1, -1).map((x) => model.nodes.get(parseInt(x))!),
        model.sortMap.get(parseInt(operands[0]))!,
        parseInt(operands.at(-1)!),
      ];
    } else {
      return [
        operands.slice(1).map((x) => model.nodes.get(parseInt(x))!),
        model.sortMap.get(parseInt(operands[0]))!,
      ];
    }
  }

  if (line.startsWith(";")) return;
  if (line === "") return;

  const entry = createNode(line);
  if (!entry) return;

  if (entry[1].nodeClass === NodeType.Sort) return;

  if (entry[1].nodeClass === NodeType.Init) {
    entry[1].parents[0].parents.push(entry[1].parents[1]);
    return;
  }

  model.nodes.set(...entry);
}

function getClass(clss: string) {
  const t = NODE_TYPES[clss];

  if (!t) throw new Error(`Unknown instruction: ${clss}`);

  return t;
}

function getSort(sort: string) {
  const s = SORT_TYPES[sort];

  if (!s) throw new Error(`Unknown sort: ${sort}`);

  return s;
}
