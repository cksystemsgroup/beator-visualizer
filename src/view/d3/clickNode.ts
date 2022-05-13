import { ModelNode, NodeType } from "../../model/NodeTypes";
import { GraphState } from "./types";

function clickNode(node: ModelNode, graphState: GraphState) {
  const expand = () => {
    node.view.collapsed = false;

    node.parents.forEach((x) => {
      graphState.nodes.set(x.nid, x);
      graphState.links.push({ source: node, target: x });
    });
  };

  const collapse = (n: ModelNode) => {
    n.view.collapsed = true;
    graphState.links = graphState.links.filter((l) => l.source !== n);

    n.parents.forEach((x) => {
      if (graphState.links.filter((l) => l.target === x).length === 0) {
        collapse(x);
        graphState.nodes.delete(x.nid);
      }
    });
  };

  if (node.type === NodeType.Const) return;

  node.view.collapsed ? expand() : collapse(node);
}

export default clickNode;
