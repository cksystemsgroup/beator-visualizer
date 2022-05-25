import { Model } from "../types/model-types";
import { ModelNode, NodeType } from "../types/node-types";

export default function processNodes(model: Model) {
  const calcDepth = (x: ModelNode, p: ModelNode) => {
    if (x.stats.depth < p.stats.depth + 1) {
      x.stats.depth = p.stats.depth + 1;
      x.parents.forEach((y) => calcDepth(y, x));

      if (x.stats.depth > model.maxDepth) {
        model.maxDepth = x.stats.depth;
      }
    }
  };

  const calcDepthS = (x: ModelNode, p: ModelNode) => {
    if (x.stats.depthS < p.stats.depthS + 1) {
      x.stats.depthS = p.stats.depthS + 1;
      x.parents.forEach((y) => calcDepthS(y, x));

      if (x.stats.depthS > model.maxDepthS) {
        model.maxDepthS = x.stats.depthS;
      }
    }
  };

  model.roots.forEach((x) => {
    x.stats.depth = 0;
    x.parents.forEach((y) => calcDepth(y, x));
  });

  [...model.nodes.values()]
    .filter((x) => x.nodeClass === NodeType.State)
    .forEach((x) => {
      x.stats.depthS = 0;
      x.parents.forEach((y) => calcDepthS(y, x));
    });
}
