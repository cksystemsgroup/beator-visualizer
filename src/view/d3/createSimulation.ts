import * as d3 from "d3";
import { ModelNode } from "../../model/NodeTypes";
import { GraphState, Link } from "./types";

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
    .forceSimulation<ModelNode, Link>(Array.from(graphState.nodes.values()))
    .force("charge", d3.forceManyBody<ModelNode>().strength(-20))
    .force(
      "link",
      d3.forceLink(Array.from(graphState.links.values()).flat()).distance(100)
    )
    .on("tick", ticked);
}

export default createSimulation;
