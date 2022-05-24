import { ModelNode } from "../../types/node-types";
import clickNode from "./click-node";
import { GraphState } from "../../types/graph-types";

function expand(
  graphState: GraphState,
  selected: ModelNode,
  showPath: boolean
) {
  const pexp = (x: ModelNode, h: number): any => {
    x.onPath = true;
    clickNode(x, graphState);
    for (const n of x.parents)
      if (n.stats.height === h - 1) return pexp(n, h - 1);
  };

  if (showPath) {
    pexp(selected, selected.stats.height);
    return;
  }

  const exp = (x: ModelNode) => {
    if (x.collapsed) {
      clickNode(x, graphState);
      x.parents.forEach(exp);
    }
  };

  exp(selected);
}

export default expand;
