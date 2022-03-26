import Model from "./Model";
import {
  Bad,
  Const,
  DagLeaf,
  Input,
  InstructionNode,
  PreLeaf,
  State,
} from "./NodeTypes";

export default function processNodes(model: Model) {
  model.rootsDag.forEach((x) => recursivePathDag(x, 0, x));
  model.rootsPre.forEach((x) => recursivePathPre(x.init, 0, x));
  console.log("Finished");

  function recursivePathDag(
    n: InstructionNode | Bad,
    depth: number,
    caller: InstructionNode | Bad
  ): [number, DagLeaf[]] {
    let aggregatorD = 0;
    let aggregatorN: DagLeaf[] = [];

    if (n.dagDepth < depth) {
      n.longestChild = caller;
      n.dagDepth = depth;
      if (depth > model.globalMaxDagDepth) {
        model.globalMaxDagDepth = depth;
        model.globalMaxDagStart = n;
      }
    }

    if (n instanceof Const) return [1, [n]];
    if (n instanceof Input) return [1, [n]];
    if (n instanceof State) return [1, [n]];

    n.parents.forEach((x) => {
      const [d, p] = recursivePathDag(x, depth + 1, n);
      aggregatorD += d;
      p.forEach((x) => aggregatorN.push(x));
    });

    if (aggregatorD > model.maxDagEntanglement) {
      model.maxDagEntanglement = aggregatorD;
      model.maxDagEntangled = n;
    }
    n.dagEntanglement = aggregatorD;
    n.dagEntanglers = aggregatorN;
    return [aggregatorD, aggregatorN];
  }

  function recursivePathPre(
    n: InstructionNode | Bad | undefined,
    depth: number,
    caller: InstructionNode | Bad
  ): [number, PreLeaf[]] {
    if (n === undefined) return [0, []];

    let aggregatorD = 0;
    let aggregatorN: PreLeaf[] = [];

    if (n instanceof Const) return [1, [n]];
    if (n instanceof Input) return [1, [n]];

    if (n.preDepth < depth) {
      n.longestChild = caller;
      n.preDepth = depth;
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
    n.preEntanglement = aggregatorD;
    n.preEntanglers = aggregatorN;
    return [aggregatorD, aggregatorN];
  }
}
