import Model from "../model/Model";
import { TargetFunction } from "./d3/types";

function reset(model: Model, setTarget: TargetFunction, element: Element) {
  element.replaceChildren();
  setTarget(undefined);
  for (const n of model.nodes.values())
    n.view = { collapsed: true, index: n.nid, x: 0, y: 0, radius: 10 };
}

export default reset;
