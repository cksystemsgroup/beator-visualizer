import Model from "./Model";
import { ModelNode, NodeType } from "./NodeTypes";

export default function processNodes(model: Model) {
  model.dagRoots.forEach((x) => recursivePathDag(x, 0, x));
  model.iniRoots.forEach((x) => recursivePathIni(x.parents[0], 0, x));

  function recursivePathDag(
    n: ModelNode,
    depth: number,
    caller: ModelNode
  ): [number, ModelNode[]] {
    let aggregatorD = 0;
    let aggregatorN: ModelNode[] = [];

    if (n.stats.dagDepth < depth) {
      n.stats.longestChild = caller;
      n.stats.dagDepth = depth;
      if (depth > model.dagDepthMax) {
        model.dagDepthMax = depth;
        model.dagStartMax = n;
      }
    }

    if (n.type === NodeType.Const) return [1, [n]];
    if (n.type === NodeType.Input) return [1, [n]];
    if (n.type === NodeType.State) return [1, [n]];

    n.parents.forEach((x) => {
      const [d, p] = recursivePathDag(x, depth + 1, n);
      aggregatorD += d;
      p.forEach((x) => aggregatorN.push(x));
    });

    if (aggregatorD > model.dagEntanglementMax) {
      model.dagEntanglementMax = aggregatorD;
      model.dagEntangledMax = n;
    }
    n.stats.dagEntanglement = aggregatorD;
    n.stats.dagEntanglers = aggregatorN;
    return [aggregatorD, aggregatorN];
  }

  function recursivePathIni(
    n: ModelNode,
    depth: number,
    caller: ModelNode
  ): [number, ModelNode[]] {
    if (n === undefined) return [0, []];

    let aggregatorD = 0;
    let aggregatorN: ModelNode[] = [];

    if (n.type === NodeType.Const) return [1, [n]];
    if (n.type === NodeType.Input) return [1, [n]];

    if (n.stats.iniDepth < depth) {
      n.stats.longestChild = caller;
      n.stats.iniDepth = depth;
      if (depth > model.iniDepthMax) {
        model.iniDepthMax = depth;
        model.iniStartMax = n;
      }
    }

    n.parents.forEach((x) => {
      const [d, p] = recursivePathIni(x, depth + 1, n);
      aggregatorD += d;
      p.forEach((x) => aggregatorN.push(x));
    });

    if (aggregatorD > model.iniEntanglementMax) {
      model.iniEntanglementMax = aggregatorD;
      model.iniEntangledMax = caller;
    }
    n.stats.iniEntanglement = aggregatorD;
    n.stats.iniEntanglers = aggregatorN;
    return [aggregatorD, aggregatorN];
  }
}
