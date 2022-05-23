import { ModelNode, NodeType, SortType } from "../types/node-types";

export class Model {
  maxDepthStart?: ModelNode;
  maxDependantNode?: ModelNode;

  nodes = new Map<number, ModelNode>();
  roots: ModelNode[] = [];
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
    this.nrOfBads = model.roots.filter(
      (x) => x.nodeClass === NodeType.Bad
    ).length;
    this.nrOfStates = model.roots.length - this.nrOfBads;
    this.longestPathLength = model.maxDepth;
    this.maxDependancy = model.maxDependancy;
  }
}

export type NodeParams = [ModelNode[], SortType, number?, string?];
