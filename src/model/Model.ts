import { ModelNode } from "./NodeTypes";

export default interface Model {
  nodes: Map<number, ModelNode>;
  bads: ModelNode[];
  dagRoots: ModelNode[];
  iniRoots: ModelNode[];
  unrollDepth: number;
  dagDepthMax: number;
  dagStartMax?: ModelNode;
  iniDepthMax: number;
  iniStartMax?: ModelNode;
  dagEntanglementMax: number;
  iniEntanglementMax: number;
  dagEntangledMax?: ModelNode;
  iniEntangledMax?: ModelNode;
}

export function newModel(unrollDepth: number): Model {
  return {
    nodes: new Map(),
    dagRoots: [],
    iniRoots: [],
    bads: [],
    unrollDepth,
    dagDepthMax: 0,
    iniDepthMax: 0,
    dagEntanglementMax: 0,
    iniEntanglementMax: 0,
  };
}
