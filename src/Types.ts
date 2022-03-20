export interface NodeG {
  readonly nid: number;
}

export interface NodeR extends NodeG {
  sort: NodeT;
}

export interface NodeT extends NodeG {
  name: string;
}

export interface BitVec extends NodeT {
  size: number;
}

export interface Array extends NodeT {
  size: NodeT;
  address: NodeT;
}

export interface Const extends NodeR {
  readonly sort: NodeT;
  readonly imm: number;
}

export interface Read extends NodeR {
  readonly memory: NodeR;
  readonly address: NodeR;
}

export interface Write extends NodeR {
  readonly memory: NodeR;
  readonly address: NodeR;
  readonly value: NodeR;
}

export interface Operation extends NodeR {
  readonly left: NodeR;
  readonly right: NodeR;
}

export interface Add extends Operation {}
export interface Sub extends Operation {}
export interface Mul extends Operation {}
export interface Div extends Operation {}
export interface Rem extends Operation {}
export interface Ult extends Operation {}

export interface Ext extends NodeR {
  readonly from: NodeR;
  readonly value: number;
}

export interface Ite extends Operation {
  readonly cond: NodeR;
}

export interface Eq extends Operation {}
export interface And extends Operation {}

export interface Not extends NodeR {
  readonly value: NodeR;
}

export interface State extends NodeR {
  init?: NodeR;
  readonly name: string;
}

export interface Next extends NodeR {
  readonly state: NodeR;
  readonly next: NodeR;
}

export interface Input extends NodeR {
  readonly name: string;
}

export interface Bad extends NodeG {
  cond: NodeR;
  name: string;
}

export interface Results {
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

export interface Model {
  nodes: Map<number, NodeG>;
  sorts: NodeT[];
  roots: (Bad | Next)[];
}
