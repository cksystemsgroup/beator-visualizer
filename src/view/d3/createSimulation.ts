import * as d3 from "d3";
import { ModelNode } from "../../model/NodeTypes";
import { GraphState, Link } from "./types";

function createSimulation(graphState: GraphState) {
  const ticked = () => {
    graphState.linkGroup.attr("d", (d: any) => {
      const dx = d.target.view.x - d.source.view.x;
      const dy = d.target.view.y - d.source.view.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const scaleFactor = (10 + 10) / length; // TODO: remove magic numbers (radius and arrowsize)

      return d3.line()([
        [d.source.view.x, d.source.view.y],
        [
          d.target.view.x - dx * scaleFactor,
          d.target.view.y - dy * scaleFactor,
        ],
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
