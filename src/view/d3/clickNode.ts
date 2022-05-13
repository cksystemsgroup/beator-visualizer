import Model from "../../model/Model";
import { ModelNode } from "../../model/NodeTypes";
import { GraphState, Link } from "./types";

function clickNode(nid: number, model: Model, graphState: GraphState) {
  const n = model.nodes.get(nid);

  if (!n) throw new Error("Could not find clicked Node in model. 💀");

  if (n.type === "Constant") return;

  const whatHappensIfCollapsed = () => {
    n.view.collapsed = false;
    n.parents.forEach((x) => {
      const newLink = { source: graphState.nodes.get(nid)!, target: x };

      graphState.nodes.set(x.nid, x);
      setArray(graphState.links, x.nid, newLink);
    });
  };

  const whatHappensIfExpanded = () => {
    const recursiveDeletion = (m: ModelNode, caller: ModelNode) => {
      m.parents.forEach((x) => recursiveDeletion(x, m));
      m.view.collapsed = true;
      if (graphState.links.get(m.nid)!.length === 1)
        graphState.nodes.delete(m.nid);
      filterArray(
        graphState.links,
        m.nid,
        (x: Link) => x.source !== graphState.nodes.get(caller.nid)!
      );
    };

    n.parents.forEach((x) => recursiveDeletion(x, n));
    n.view.collapsed = true;
  };

  n.view.collapsed ? whatHappensIfCollapsed() : whatHappensIfExpanded();
}

const setArray = (m: Map<unknown, unknown[]>, k: unknown, v: unknown) =>
  m.get(k)?.push(v) || m.set(k, [v]);

const filterArray = (
  m: Map<unknown, unknown[]>,
  key: unknown,
  filter: (x: any) => boolean
) => {
  let arr = m.get(key)!.filter(filter);
  m.set(key, arr);
};

export default clickNode;
