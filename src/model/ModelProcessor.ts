import processLine from "./LineProcessor";
import { newModel } from "./Model";
import processNodes from "./NodeProcessor";

function processModel(text: string) {
  const model = newModel();

  const lines = text.split("\n");
  lines.forEach((x) => processLine(x, model));

  processNodes(model);

  return model;
}

export default processModel;
