import Model from "../../model/Model";
import { ModelNode } from "../../model/NodeTypes";
import applyMarker from "./applyMarker";
import createSimulation from "./createSimulation";
import linkGroup from "./linkGroup";
import nodeGroup from "./nodeGroup";
import svgGroup from "./svgGroup";
import { GraphState, Link, NodeD3, Simulation } from "./types";
import zoom from "./zoom";

function setupGraph(
  model: Model,
  element: null,
  selected: ModelNode
): [GraphState, Simulation] {
  const g = svgGroup(element);
  const graphState: GraphState = {
    links: new Map<number, Link[]>(),
    nodes: new Map<number, NodeD3>(),
    linkGroup: linkGroup(g),
    nodeGroup: nodeGroup(g),
    svgGroup: g,
  };

  graphState.nodes.set(selected.nid, {
    index: selected.nid,
    nid: selected.nid,
    type: selected.type,
  });

  applyMarker(g);

  zoom(g, element);

  return [graphState, createSimulation(graphState)];
}

export default setupGraph;
