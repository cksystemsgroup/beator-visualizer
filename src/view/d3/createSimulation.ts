import * as d3 from "d3";
import { ModelNode } from "../../model/NodeTypes";
import { GraphState, Link } from "./types";

function createSimulation(graphState: GraphState) {
  const ticked = () => {
    graphState.linkGroup.attr("d", (d: any) => {
      const dx = d.target.x - d.source.x;
      const dy = d.target.y - d.source.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const scaleFactor = (d.target.radius + 10) / length; // TODO: remove magic number (arrowsize)

      return d3.line()([
        [d.source.x, d.source.y],
        [d.target.x - dx * scaleFactor, d.target.y - dy * scaleFactor],
      ]);
    });

    graphState.nodeGroup.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
  };

  return d3
    .forceSimulation<ModelNode, Link>(Array.from(graphState.nodes.values()))
    .force("charge", d3.forceManyBody<ModelNode>().strength(-30))
    .force(
      "link",
      d3.forceLink(Array.from(graphState.links.values()).flat()).distance(100)
    )
    .on("tick", ticked);
}

export default createSimulation;
