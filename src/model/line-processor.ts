import { Model, NodeParams } from "../types/model-types";
import {
  Dependancy,
  ModelNode,
  NodeType,
  NodeTypeMap,
  SortType,
  SortTypeMap,
} from "../types/node-types";

const NODE_TYPES: NodeTypeMap = {
  sort: NodeType.Sort,
  constd: NodeType.Constant,
  read: NodeType.Read,
  write: NodeType.Write,
  add: NodeType.Addition,
  sub: NodeType.Subtraction,
  mul: NodeType.Multiplication,
  udiv: NodeType.Division,
  urem: NodeType.Remainder,
  ult: NodeType.LessThan,
  eq: NodeType.Equals,
  and: NodeType.And,
  uext: NodeType.Extend,
  ite: NodeType.IfThenElse,
  not: NodeType.Not,
  state: NodeType.State,
  init: NodeType.Initialization,
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

  let n = new ModelNode(nid, type, ...getParameters(line, model));

  if (type === NodeType.Initialization) {
    const state = n.parents[0];
    state.parents.push(n.parents[1]);
    model.states.push(state);
    n = state;
  }

  if (type === NodeType.Next) model.roots.push(n);
  if (type === NodeType.Bad) model.roots.push(n);

  n.stats.dependancy = sumDependancy(n.parents);
  n.stats.height =
    n.parents.reduce((a, x) => (x.stats.height > a ? x.stats.height : a), -1) +
    1;

  const dep = Object.values(n.stats.dependancy).reduce((a, x) => a + x.size, 0);

  if (dep > model.maxDependancy) {
    model.maxDependancy = dep;
    model.maxDependantNode = n;
  }

  if (n.nodeClass === NodeType.State && dep > model.maxDependancyS) {
    model.maxDependancyS = dep;
    model.maxDependantNodeS = n;
  }

  model.nodes.set(nid, n);
}

const getParameters = (line: string, model: Model): NodeParams => {
  const [, inst, ...operands] = line.split(" ");

  const parseN = bindModel(parseNid, model);
  const int = parseInt;
  const sort = parseSort(operands[0], model);
  const u = undefined;
  // TODO: next braucht namen
  switch (getClass(inst)) {
    case NodeType.Constant:
      return [[], sort, int(operands[1])];
    case NodeType.State:
    case NodeType.Input:
      return [operands.slice(1, -1).map(parseN), sort, u, operands.at(-1)];
    case NodeType.Bad:
      return [operands.slice(0, -1).map(parseN), sort, u, operands.at(-1)];
    case NodeType.Extend:
      return [operands.slice(1, -1).map(parseN), sort, int(operands.at(-1)!)];
    case NodeType.Next:
      const name = parseN(operands[1]).name;
      return [operands.slice(1).map(parseN), sort, undefined, name];
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

const sumDependancy = (nodes: ModelNode[]) => {
  return nodes.reduce((a, b) => {
    const depB = b.stats.dependancy;

    for (const k in depB) {
      depB[k].forEach((x) => a[k].add(x));
    }

    a[b.nodeClass].add(b);

    return a;
  }, new Dependancy());
};
