import Model from "./Model";
import {
  Bad,
  Const,
  DagLeaf,
  Input,
  InstructionNode,
  State,
} from "./NodeTypes";

export default function processNodes(model: Model) {
  model.rootsDag.forEach((x) => recursivePathDag(x, 0, x));
  model.rootsPre.forEach((x) => recursivePathDag(x, 0, x));
  console.log("Finished");

  function recursivePathDag(
    n: InstructionNode | Bad,
    depth: number,
    caller: InstructionNode | Bad
  ): [number, DagLeaf[]] {
    let aggregatorD = 0;
    let aggregatorN: DagLeaf[] = [];

    if (n.distance < depth) {
      n.longestChild = caller;
      n.distance = depth;
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

    n.entanglement = aggregatorD;
    n.entanglers = aggregatorN;
    return [aggregatorD, aggregatorN];
  }
}
