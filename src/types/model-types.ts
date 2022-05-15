import { ModelNode, SortType } from "../types/node-types";

export class Model {
  dagStartMax?: ModelNode;
  iniStartMax?: ModelNode;
  dagEntangledMax?: ModelNode;
  iniEntangledMax?: ModelNode;

  nodes = new Map<number, ModelNode>();
  dagRoots: ModelNode[] = [];
  iniRoots: ModelNode[] = [];
  bads: ModelNode[] = [];
  dagDepthMax = 0;
  iniDepthMax = 0;
  dagEntanglementMax = 0;
  iniEntanglementMax = 0;
  sortMap = new Map<number, SortType>();
}

export class Metrics {
  nrOfNodes: number;
  nrOfBads: number;
  nrOfStates: number;
  longestPathLength: number;
  maxEntanglement: number;

  constructor(model: Model) {
    this.nrOfNodes = model.nodes.size;
    this.nrOfBads = model.bads.length;
    this.nrOfStates = model.dagRoots.length - model.bads.length;
    this.longestPathLength = model.dagDepthMax;
    this.maxEntanglement = model.dagEntanglementMax;
  }
}
