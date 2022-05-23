import { Model } from "../types/model-types";
import processLine from "./line-processor";

function processModel(text: string) {
  const model = new Model();

  const lines = text.split("\n");
  lines.forEach((x) => processLine(x, model));

  // processNodes(model);

  return model;
}

export default processModel;
