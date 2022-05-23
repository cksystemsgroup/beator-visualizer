import { ModelNode, SortType } from "../types/node-types";

export class Model {
  maxDepthStart?: ModelNode;
  maxDependantNode?: ModelNode;

  nodes = new Map<number, ModelNode>();
  roots: ModelNode[] = [];
  bads: ModelNode[] = [];
  maxDepth = 0;
  maxDependancy = 0;
  sortMap = new Map<number, SortType>();
}

export class Metrics {
  nrOfNodes: number;
  nrOfBads: number;
  nrOfStates: number;
  longestPathLength: number;
  maxDependancy: number;

  constructor(model: Model) {
    this.nrOfNodes = model.nodes.size;
    this.nrOfBads = model.bads.length;
    this.nrOfStates = model.roots.length - model.bads.length;
    this.longestPathLength = model.maxDepth;
    this.maxDependancy = model.maxDependancy;
  }
}
