import processLine from "./LineProcessor";
import Model, { newModel } from "./Model";
import processNodes from "./NodeProcessor";

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
      `Number of nodes: ${this.#model.nodes.size} ${
        this.#model.unrollDepth
          ? `(${(this.#model.nodes.size / this.#model.unrollDepth).toFixed(3)})`
          : ""
      }`,
      `Number of bads: ${this.#model.bads.length} ${
        this.#model.unrollDepth
          ? `(${(this.#model.bads.length / this.#model.unrollDepth).toFixed(
              3
            )})`
          : ""
      }`,
      `Number of states: ${this.#model.rootsPre.length} ${
        this.#model.unrollDepth
          ? `(${(this.#model.rootsPre.length / this.#model.unrollDepth).toFixed(
              3
            )})`
          : ""
      }`,
    ];
  }
}
