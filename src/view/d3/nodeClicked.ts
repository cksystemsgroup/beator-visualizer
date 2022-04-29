import Model from "../../model/Model";
import { ModelNode } from "../../model/NodeTypes";
import { GraphState } from "./types";

function nodeClicked(nid: number, model: Model, graphState: GraphState) {
  const n = model.nodes.get(nid);

  if (!n) throw new Error("Could not find clicked Node in model. 💀");

  if (n.view.collapsed) {
    n.parents.forEach((m) => {
      const newNode = graphState.nodes.has(m.nid)
        ? graphState.nodes.get(m.nid)!
        : { index: m.nid, nid: m.nid, type: m.type };
      const newLink = {
        source: graphState.nodes.get(nid)!,
        target: newNode,
      };
      graphState.nodes.set(m.nid, newNode);
      setArray(graphState.links, m.nid, newLink);
    });
  } else {
    const recDel = (m: ModelNode) => {
      m.parents.forEach(recDel);
      m.view.collapsed = true;
      graphState.nodes.delete(m.nid);
      graphState.links.delete(m.nid);
    };
    n.parents.forEach(recDel);
  }
  n.view.collapsed = !n.view.collapsed;
}

const setArray = (m: Map<unknown, unknown[]>, k: unknown, v: unknown) => {
  if (m.has(k)) m.get(k)!.push(v);
  else m.set(k, [v]);
};

export default nodeClicked;
