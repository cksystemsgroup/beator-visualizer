import { Model, NodeParams } from "../types/model-types";
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
  if (line.startsWith(";")) return;
  if (line === "") return;

  const [nidStr, inst, ...operands] = line.split(" ");
  const nid = parseInt(nidStr);
  const type = getClass(inst);

  if (type === NodeType.Sort)
    return model.sortMap.set(nid, getSort(operands.at(-1)!));

  const n = new ModelNode(nid, type, ...getParameters(line, model));

  if (type === NodeType.Init) return n.parents[0].parents.push(n.parents[1]);
  if (type === NodeType.Next) model.roots.push(n);
  if (type === NodeType.Bad) model.roots.push(n);

  model.nodes.set(nid, n);
}

const getParameters = (line: string, model: Model): NodeParams => {
  const [, inst, ...operands] = line.split(" ");

  const parseN = bindModel(parseNid, model);
  const int = parseInt;
  const sort = parseSort(operands[0], model);
  const u = undefined;

  switch (getClass(inst)) {
    case NodeType.Const:
      return [[], sort, int(operands[1])];
    case NodeType.State:
    case NodeType.Input:
      return [operands.slice(1, -1).map(parseN), sort, u, operands.at(-1)];
    case NodeType.Bad:
      return [operands.slice(0, -1).map(parseN), sort, u, operands.at(-1)];
    case NodeType.Ext:
      return [operands.slice(1, -1).map(parseN), sort, int(operands.at(-1)!)];
    default:
      return [operands.slice(1).map(parseN), sort];
  }
};

const getClass = (clss: string) => {
  const t = NODE_TYPES[clss];

  if (!t) throw new Error(`Unknown instruction: ${clss}`);

  return t;
};

const getSort = (sort: string) => {
  const s = SORT_TYPES[sort];

  if (!s) throw new Error(`Unknown sort: ${sort}`);

  return s;
};

const parseNid = (nid: string, model: Model) => model.nodes.get(parseInt(nid))!;

const parseSort = (s: string, model: Model) => model.sortMap.get(parseInt(s))!;

const bindModel = (f: (a: string, b: Model) => any, m: Model) => (x: string) =>
  f(x, m);
