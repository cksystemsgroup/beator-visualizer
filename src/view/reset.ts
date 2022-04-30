import Model from "../model/Model";
import { TargetFunction } from "./d3/types";

function reset(model: Model, setTarget: TargetFunction, element: unknown) {
  (element as Element).replaceChildren();
  setTarget(undefined);
  for (const n of model.nodes.values()) n.view.collapsed = true;
}

export default reset;
