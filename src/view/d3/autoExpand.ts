import Model from "../../model/Model";
import { ModelNode } from "../../model/NodeTypes";
import nodeClicked from "./nodeClicked";
import { GraphState } from "./types";

function autoExpand(model: Model, graphState: GraphState) {
  // TODO: buggy
  const expand = (x: ModelNode) => {
    nodeClicked(x.nid, model, graphState);
    x.parents.forEach(expand);
  };
  nodeClicked(model.bads[0].nid, model, graphState);
  model.bads[0].parents.forEach(expand);
}

export default autoExpand;
