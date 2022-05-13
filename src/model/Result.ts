import Model from "./Model";

export default interface Metrics {
  nrOfNodes: number;
  nrOfBads: number;
  nrOfStates: number;
  longestPathLength: number;
  maxEntanglement: number;
}

export function createMetrics(model: Model): Metrics {
  return {
    nrOfNodes: model.nodes.size,
    nrOfBads: model.bads.length,
    nrOfStates: model.dagRoots.length - model.bads.length,
    longestPathLength: model.dagDepthMax,
    maxEntanglement: model.dagEntanglementMax,
  };
}
