import { Bad, GenericNode, Next, State, TypeNode } from "./NodeTypes";

export default interface Model {
  nodes: Map<number, GenericNode>;
  sorts: TypeNode[];
  bads: Bad[];
  rootsDag: (Bad | Next)[];
  rootsPre: State[];
  unrollDepth: number;
  globalMaxDagDepth: number;
  globalMaxDagStart?: GenericNode;
}

export function newModel(unrollDepth: number): Model {
  return {
    nodes: new Map<number, GenericNode>(),
    sorts: [],
    rootsDag: [],
    rootsPre: [],
    bads: [],
    unrollDepth,
    globalMaxDagDepth: 0,
  };
}
