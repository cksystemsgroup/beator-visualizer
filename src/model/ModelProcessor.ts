import processLine from "./LineProcessor";
import Model, { newModel } from "./Model";
import { dagifyModel } from "./ModelDagger";
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

  dagify(): {
    nodes: Map<string, { id: string; group: number; collapsed: boolean }>;
    links: { source: string; target: string }[];
  } {
    return dagifyModel(this.#model);
  }
}
