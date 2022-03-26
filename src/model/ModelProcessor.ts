import processLine from "./LineProcessor";
import Model, { newModel } from "./Model";
import processNodes from "./NodeProcessor";
import { createMetrics } from "./Result";

export default class ModelProcessor {
  #model: Model;

  constructor(text: string, unrollDepth: number) {
    this.#model = newModel(unrollDepth);

    const lines = text.split("\n");
    lines.forEach((x) => processLine(x, this.#model));

    processNodes(this.#model);

    console.log(this.#model);
  }

  printResults(): string[] {
    return [
      ...Object.entries(createMetrics(this.#model)).map(
        ([k, v]) => `${k}: ${v}`
      ),
    ];
  }
}
