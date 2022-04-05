import Model from "./Model";
import { Bad, Const, Input, InstructionNode, Next, State } from "./NodeTypes";

export function dagifyModel(model: Model): {
  nodes: { id: string; group: number }[];
  links: { source: string; target: string }[];
} {
  let nodes: { id: string; group: number }[] = [];
  let links: { source: string; target: string }[] = [];
  for (const n of model.nodes.values()) {
    if (n instanceof InstructionNode) {
      nodes.push({
        id: n.nid.toString(),
        group: getGroup(n),
      });
      n.parents.forEach((x) =>
        links.push({ source: n.nid.toString(), target: x.nid.toString() })
      );
    }
  }

  console.log("dagged");

  return { nodes, links };
}

function getGroup(n: InstructionNode) {
  if (n instanceof Bad) return 1;
  if (n instanceof Next) return 1;
  if (n instanceof State) return 2;
  if (n instanceof Input) return 2;
  if (n instanceof Const) return 2;
  return 3;
}
