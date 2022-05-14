import { ModelNode } from "../../model/NodeTypes";
import clickNode from "./clickNode";
import { GraphState } from "./types";

function expand(graphState: GraphState, selected: ModelNode) {
  const exp = (x: ModelNode) => {
    if (x.collapsed) {
      clickNode(x, graphState);
      x.parents.forEach(exp);
    }
  };
  exp(selected);
}

export default expand;
