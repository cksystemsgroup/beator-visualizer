import Model from "./Model";

export default interface Metrics {
  nrOfNodes: number;
  nrOfNodesPer?: number;
  nrOfBads: number;
  nrOfBadsPer?: number;
  nrOfStates: number;
  nrOfStatesPer?: number;
  longestPathLength: number;
  longestPathLengthPer?: number;
  maxEntanglement: number;
}

export function createMetrics(model: Model): Metrics {
  let metrics: Metrics = {
    nrOfNodes: model.nodes.size,
    nrOfBads: model.bads.length,
    nrOfStates: model.dagRoots.length - model.bads.length,
    longestPathLength: model.dagDepthMax,
    maxEntanglement: model.dagEntanglementMax,
  };

  if (model.unrollDepth) {
    Object.assign(metrics, {
      nrOfNodesPer: model.nodes.size / model.unrollDepth,
      nrOfBadsPer: model.bads.length / model.unrollDepth,
      nrOfStatesPer:
        (model.dagRoots.length - model.bads.length) / model.unrollDepth,
      longestDagPathLengthPer: model.dagDepthMax / model.unrollDepth,
      longestIniPathLengthPer: model.iniDepthMax / model.unrollDepth,
      iniLengthPerdagLength:
        model.iniDepthMax / model.unrollDepth / model.dagDepthMax,
    });
  }

  return metrics;
}
