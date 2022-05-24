import { ModelNode } from "../../types/node-types";
import clickNode from "./click-node";
import { GraphState } from "../../types/graph-types";

function expand(
  graphState: GraphState,
  selected: ModelNode,
  showPath: boolean
) {
  if (showPath) {
    console.log("Showing the longest path");
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
