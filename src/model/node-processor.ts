import { Model } from "../types/model-types";
import { ModelNode } from "../types/node-types";

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

  model.roots.forEach((x) => {
    x.stats.depth = 0;
    x.parents.forEach((y) => calcDepth(y, x));
  });
}
