import Model from "../../model/Model";
import { ModelNode } from "../../model/NodeTypes";
import clickNode from "./clickNode";
import { GraphState } from "./types";

function autoExpand(model: Model, graphState: GraphState, selected: ModelNode) {
  const expand = (x: ModelNode) => {
    if (x.view.collapsed) {
      clickNode(x.nid, model, graphState);
      x.parents.forEach(expand);
    }
  };
  expand(selected);
}

export default autoExpand;
