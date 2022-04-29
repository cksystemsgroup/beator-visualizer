import * as d3 from "d3";
import { GraphState, Link, NodeD3 } from "./types";

function createSimulation(graphState: GraphState) {
  const ticked = () => {
    graphState.linkGroup
      .attr("x1", (d) => d.source.x!)
      .attr("y1", (d) => d.source.y!)
      .attr("x2", (d) => d.target.x!)
      .attr("y2", (d) => d.target.y!);

    graphState.nodeGroup.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
  };

  return d3
    .forceSimulation<NodeD3, Link>(Array.from(graphState.nodes.values()))
    .force("charge", d3.forceManyBody<NodeD3>().strength(-100))
    .force(
      "link",
      d3.forceLink(Array.from(graphState.links.values()).flat()).distance(150)
    )
    .on("tick", ticked);
}

export default createSimulation;
