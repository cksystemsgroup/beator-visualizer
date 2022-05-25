import { Model } from "../types/model-types";
import processLine from "./line-processor";
import processNodes from "./node-processor";

function processModel(text: string) {
  const model = new Model();

  const lines = text.split("\n");
  lines.forEach((x) => processLine(x, model));

  processNodes(model);

  model.maxDepthStart = [...model.nodes.values()].reduce((a, x) =>
    x.stats.height > a.stats.height ? x : a
  );

  model.maxDepthStartS = model.states.reduce((a, x) =>
    x.stats.height > a.stats.height ? x : a
  );

  return model;
}

export default processModel;
