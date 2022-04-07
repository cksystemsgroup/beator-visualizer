import Model from "./Model";
import { Bad, Const, Input, InstructionNode, Next, State } from "./NodeTypes";

export function dagifyModel(model: Model): {
  nodes: Map<string, { id: string; group: number; collapsed: boolean }>;
  links: { source: string; target: string }[];
} {
  let nodes: Map<string, { id: string; group: number; collapsed: boolean }> =
    new Map();
  let links: { source: string; target: string }[] = [];
  for (const n of model.nodes.values()) {
    if (n instanceof InstructionNode) {
      nodes.set(n.nid.toString(), {
        id: n.nid.toString(),
        group: getGroup(n),
        collapsed: true,
      });
      n.parents.forEach((x) =>
        links.push({ source: n.nid.toString(), target: x.nid.toString() })
      );
    }
  }

  let first = nodes.get(model.bads[0].nid.toString());
  if (first) first.collapsed = false;

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
