import { ModelNode } from "./NodeTypes";

export default interface Model {
  nodes: Map<number, ModelNode>;
  bads: ModelNode[];
  rootsDag: ModelNode[];
  rootsPre: ModelNode[];
  unrollDepth: number;
  globalMaxDagDepth: number;
  globalMaxDagStart?: ModelNode;
  globalMaxPreDepth: number;
  globalMaxPreStart?: ModelNode;
  maxDagEntanglement: number;
  maxPreEntanglement: number;
  maxDagEntangled?: ModelNode;
  maxPreEntangled?: ModelNode;
}

export function newModel(unrollDepth: number): Model {
  return {
    nodes: new Map(),
    rootsDag: [],
    rootsPre: [],
    bads: [],
    unrollDepth,
    globalMaxDagDepth: 0,
    globalMaxPreDepth: 0,
    maxDagEntanglement: 0,
    maxPreEntanglement: 0,
  };
}
