import Model from "../../model/Model";
import { ModelNode } from "../../model/NodeTypes";
import nodeClicked from "./nodeClicked";
import { GraphState } from "./types";

function expand(model: Model, graphState: GraphState, selected: ModelNode) {
  const expand = (x: ModelNode) => {
    if (x.view.collapsed) {
      nodeClicked(x.nid, model, graphState);
      x.parents.forEach(expand);
    }
  };
  expand(selected);
}

export default expand;
