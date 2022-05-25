import { ModelNode, NodeType, SortType } from "../types/node-types";

export class Model {
  maxDepthStart?: ModelNode;
  maxDependantNode?: ModelNode;
  maxDepthStartS?: ModelNode;
  maxDependantNodeS?: ModelNode;

  nodes = new Map<number, ModelNode>();
  roots: ModelNode[] = [];
  states: ModelNode[] = [];
  maxDepth = -Infinity;
  maxDependancy = -Infinity;
  maxDepthS = -Infinity;
  maxDependancyS = -Infinity;
  sortMap = new Map<number, SortType>();
}

export class Metrics {
  nrOfNodes: number;
  nrOfBads: number;
  nrOfStates: number;
  longestPathLength: number;
  longestPathStart: ModelNode;
  longestPathLengthS: number;
  longestPathStartS: ModelNode;
  maxDependancy: number;
  maxDependantNode: ModelNode;
  maxDependancyS: number;
  maxDependantNodeS: ModelNode;

  constructor(model: Model) {
    this.nrOfNodes = model.nodes.size;
    this.nrOfBads = model.roots.filter(
      (x) => x.nodeClass === NodeType.Bad
    ).length;
    this.nrOfStates = model.roots.length - this.nrOfBads;

    this.longestPathLength = model.maxDepth;
    this.maxDependancy = model.maxDependancy;
    this.maxDependantNode = model.maxDependantNode!;
    this.longestPathStart = model.maxDepthStart!;

    this.longestPathLengthS = model.maxDepthS;
    this.maxDependancyS = model.maxDependancyS;
    this.maxDependantNodeS = model.maxDependantNodeS!;
    this.longestPathStartS = model.maxDepthStartS!;
  }
}

export type NodeParams = [ModelNode[], SortType, number?, string?];
