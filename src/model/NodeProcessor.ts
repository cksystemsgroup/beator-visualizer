import Model from "./Model";
import { ModelNode, NodeType } from "./NodeTypes";

export default function processNodes(model: Model) {
  model.dagRoots.forEach((x) => recursivePath(x, 0, x));
  model.iniRoots.forEach((x) => recursivePath(x.parents[0], 0, x));

  function recursivePath(
    n: ModelNode,
    depth: number,
    caller: ModelNode
  ): [number, ModelNode[]] {
    let aggregatorD = 0;
    let aggregatorN: ModelNode[] = [];

    if (n.stats.depth < depth) {
      console.log(depth);
      n.stats.pathChild = caller;
      n.stats.depth = depth;
      if (depth > model.dagDepthMax) {
        model.dagDepthMax = depth;
        model.dagStartMax = n;
      }
    }

    if (n.type === NodeType.Const) return [1, [n]];
    if (n.type === NodeType.Input) return [1, [n]];
    if (n.type === NodeType.State) return [1, [n]];

    n.parents.forEach((x) => {
      const [d, p] = recursivePath(x, depth + 1, n);
      aggregatorD += d;
      p.forEach((x) => aggregatorN.push(x));
    });

    if (aggregatorD > model.dagEntanglementMax) {
      model.dagEntanglementMax = aggregatorD;
      model.dagEntangledMax = n;
    }
    n.stats.entanglement = aggregatorD;
    n.stats.entanglers = aggregatorN;
    return [aggregatorD, aggregatorN];
  }
}
