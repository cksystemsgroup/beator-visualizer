import Model from "../../model/Model";
import applyMarker from "./applyMarker";
import createSimulation from "./createSimulation";
import linkGroup from "./linkGroup";
import nodeGroup from "./nodeGroup";
import svgGroup from "./svgGroup";
import { GraphState, Link, NodeD3, Simulation } from "./types";
import zoom from "./zoom";

function setupGraph(model: Model, element: null): [GraphState, Simulation] {
  const g = svgGroup(element);
  const graphState: GraphState = {
    links: new Map<number, Link[]>(),
    nodes: new Map<number, NodeD3>(),
    linkGroup: linkGroup(g),
    nodeGroup: nodeGroup(g),
    svgGroup: g,
  };

  graphState.nodes.set(model.bads[0].nid, {
    index: model.bads[0].nid,
    nid: model.bads[0].nid,
    type: model.bads[0].type,
  });

  applyMarker(g);

  zoom(g, element);

  return [graphState, createSimulation(graphState)];
}

export default setupGraph;
