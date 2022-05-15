import { Model } from "../types/model-types";
import { SetGraphNodeQ } from "../types/react-types";

function reset(model: Model, setTarget: SetGraphNodeQ, element: Element) {
  element.replaceChildren();
  setTarget(undefined);
  for (const n of model.nodes.values()) n.reset();
}

export default reset;
