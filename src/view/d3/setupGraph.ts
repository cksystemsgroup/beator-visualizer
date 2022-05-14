import { ModelNode } from "../../model/NodeTypes";
import * as d3 from "d3";
import createSimulation from "./createSimulation";
import { svgGroup, linkGroup, nodeGroup, applyMarker } from "./groups";
import { GraphState, Group, Simulation } from "./types";

function setupGraph(
  element: Element,
  selected: ModelNode
): [GraphState, Simulation] {
  const g = svgGroup(element);
  const graphState: GraphState = {
    links: [],
    nodes: new Map<number, ModelNode>(),
    linkGroup: linkGroup(g),
    nodeGroup: nodeGroup(g),
    svgGroup: g,
    clumps: new Map(),
  };

  graphState.nodes.set(selected.nid, selected);

  applyMarker(g);

  zoom(g, element);

  return [graphState, createSimulation(graphState)];
}

function zoom(group: Group, element: Element) {
  const zoom = d3.zoom<any, unknown>().on("zoom", function (event) {
    group.selectAll("g").attr("transform", event.transform);
  });
  d3.select(element)
    .call(zoom)
    .on("dblclick.zoom", null)
    .call(zoom.transform, d3.zoomIdentity);
}

export default setupGraph;
