import Model from "./Model";

export default interface Metrics {
  nrOfNodes: number;
  nrOfNodesPer?: number;
  nrOfBads: number;
  nrOfBadsPer?: number;
  nrOfStates: number;
  nrOfStatesPer?: number;
  longestDagPathLength: number;
  longestDagPathLengthPer?: number;
  longestPrePathLength: number;
  longestPrePathLengthPer?: number;
  preLengthPerdagLength?: number;
  maxDagEntanglement: number;
  maxPreEntanglement: number;
}

export function createMetrics(model: Model): Metrics {
  let metrics: Metrics = {
    nrOfNodes: model.nodes.size,
    nrOfBads: model.bads.length,
    nrOfStates: model.rootsDag.length - model.bads.length,
    longestDagPathLength: model.globalMaxDagDepth,
    longestPrePathLength: model.globalMaxPreDepth,
    maxDagEntanglement: model.maxDagEntanglement,
    maxPreEntanglement: model.maxPreEntanglement,
  };

  if (model.unrollDepth) {
    Object.assign(metrics, {
      nrOfNodesPer: model.nodes.size / model.unrollDepth,
      nrOfBadsPer: model.bads.length / model.unrollDepth,
      nrOfStatesPer:
        (model.rootsDag.length - model.bads.length) / model.unrollDepth,
      longestDagPathLengthPer: model.globalMaxDagDepth / model.unrollDepth,
      longestPrePathLengthPer: model.globalMaxPreDepth / model.unrollDepth,
      preLengthPerdagLength:
        model.globalMaxPreDepth / model.unrollDepth / model.globalMaxDagDepth,
    });
  }

  return metrics;
}
