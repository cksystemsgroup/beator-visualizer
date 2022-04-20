import Model from "./Model";
import { ModelNode, NodeType } from "./NodeTypes";

export default function processNodes(model: Model) {
  model.rootsDag.forEach((x) => recursivePathDag(x, 0, x));
  model.rootsPre.forEach((x) => recursivePathPre(x.parents[0], 0, x));
  console.log("Finished");

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
      if (depth > model.globalMaxDagDepth) {
        model.globalMaxDagDepth = depth;
        model.globalMaxDagStart = n;
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

    if (aggregatorD > model.maxDagEntanglement) {
      model.maxDagEntanglement = aggregatorD;
      model.maxDagEntangled = n;
    }
    n.stats.dagEntanglement = aggregatorD;
    n.stats.dagEntanglers = aggregatorN;
    return [aggregatorD, aggregatorN];
  }

  function recursivePathPre(
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
      if (depth > model.globalMaxPreDepth) {
        model.globalMaxPreDepth = depth;
        model.globalMaxPreStart = n;
      }
    }

    n.parents.forEach((x) => {
      const [d, p] = recursivePathPre(x, depth + 1, n);
      aggregatorD += d;
      p.forEach((x) => aggregatorN.push(x));
    });

    if (aggregatorD > model.maxPreEntanglement) {
      model.maxPreEntanglement = aggregatorD;
      model.maxPreEntangled = caller;
    }
    n.stats.iniEntanglement = aggregatorD;
    n.stats.iniEntanglers = aggregatorN;
    return [aggregatorD, aggregatorN];
  }
}
