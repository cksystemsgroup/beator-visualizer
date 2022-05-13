import { ModelNode, SortType } from "./NodeTypes";

export default interface Model {
  nodes: Map<number, ModelNode>;
  bads: ModelNode[];
  dagRoots: ModelNode[];
  iniRoots: ModelNode[];
  dagDepthMax: number;
  dagStartMax?: ModelNode;
  iniDepthMax: number;
  iniStartMax?: ModelNode;
  dagEntanglementMax: number;
  iniEntanglementMax: number;
  dagEntangledMax?: ModelNode;
  iniEntangledMax?: ModelNode;
  sortMap: Map<number, SortType>;
}

export function newModel(): Model {
  return {
    nodes: new Map(),
    dagRoots: [],
    iniRoots: [],
    bads: [],
    dagDepthMax: 0,
    iniDepthMax: 0,
    dagEntanglementMax: 0,
    iniEntanglementMax: 0,
    sortMap: new Map(),
  };
}
