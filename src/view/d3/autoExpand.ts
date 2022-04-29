import Model from "../../model/Model";
import { ModelNode } from "../../model/NodeTypes";
import nodeClicked from "./nodeClicked";
import { GraphState } from "./types";

function autoExpand(model: Model, graphState: GraphState) {
  const expand = (x: ModelNode) => {
    if (x.view.collapsed) {
      nodeClicked(x.nid, model, graphState);
      x.parents.forEach(expand);
    }
  };
  expand(model.bads[0]);
}

export default autoExpand;
