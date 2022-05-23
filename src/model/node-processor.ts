import { Model } from "../types/model-types";
import { ModelNode, NodeType } from "../types/node-types";

export default function processNodes(model: Model) {
  model.roots.forEach((x) => recursivePath(x, 0, x));
  // model.iniRoots.forEach((x) => recursivePath(x.parents[0], 0, x));

  function recursivePath(
    n: ModelNode,
    depth: number,
    caller: ModelNode
  ): [number, ModelNode[]] {
    let aggregatorD = 0;
    let aggregatorN: ModelNode[] = [];

    if (n.stats.depth < depth) {
      n.stats.pathChild = caller;
      n.stats.depth = depth;
      if (depth > model.maxDepth) {
        model.maxDepth = depth;
        model.maxDepthStart = n;
      }
    }

    if (n.nodeClass === NodeType.Const) return [1, [n]];
    if (n.nodeClass === NodeType.Input) return [1, [n]];
    if (n.nodeClass === NodeType.State) return [1, [n]];

    n.parents.forEach((x) => {
      const [d, p] = recursivePath(x, depth + 1, n);
      aggregatorD += d;
      p.forEach((x) => aggregatorN.push(x));
    });

    if (aggregatorD > model.maxDependancy) {
      model.maxDependancy = aggregatorD;
      model.maxDependantNode = n;
    }
    // n.stats.dependancy = aggregatorD;
    // n.stats.dependants = aggregatorN;
    return [aggregatorD, aggregatorN];
  }
}
