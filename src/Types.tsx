export interface Node {
  readonly nid: number;
}

interface NodeR extends Node {}

interface NodeT extends Node {
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
  readonly sort: number;
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

interface Operation extends NodeR {
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
  readonly from: NodeT;
  readonly value: NodeR;
}

export interface Ite extends Operation {
  readonly sort: NodeT;
  readonly cond: NodeR;
}

export interface Eq extends Operation {}
export interface And extends Operation {}

export interface Not extends NodeR {
  readonly value: NodeR;
}

export interface State extends NodeR {
  readonly sort: NodeT;
  readonly init?: NodeR;
  readonly name?: string;
}

export interface Next extends NodeR {
  readonly sort: NodeT;
  readonly state: NodeR;
  readonly next: NodeR;
}

export interface Input extends NodeR {
  readonly sort: NodeT;
  readonly name: string;
}

export interface Bad extends NodeR {
  cond: NodeR;
  name?: string;
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
