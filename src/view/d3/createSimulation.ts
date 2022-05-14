import * as d3 from "d3";
import { ModelNode, SortType } from "../../model/NodeTypes";
import { GraphNode, GraphState, Link } from "./types";

function createSimulation(graphState: GraphState) {
  const ticked = () => {
    graphState.linkGroup.attr("d", (d: any) => {
      const dx = d.target.x - d.source.x;
      const dy = d.target.y - d.source.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const scaleFactor = (d.target.radius + 10) / length; // TODO: remove magic number (arrowsize)

      const tX: [number, number] =
        d.sort === SortType.Clump
          ? [d.target.x, d.target.y]
          : [d.target.x - dx * scaleFactor, d.target.y - dy * scaleFactor];

      return d3.line()([[d.source.x, d.source.y], tX]);
    });

    graphState.nodeGroup.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  };

  return d3
    .forceSimulation<GraphNode, Link>(Array.from(graphState.nodes.values()))
    .force("centering", d3.forceCenter())
    .force("charge", d3.forceManyBody<ModelNode>().strength(-20))
    .force("link", d3.forceLink(graphState.links).distance(250))
    .force("collide", d3.forceCollide().radius(20))
    .on("tick", ticked);
}

export default createSimulation;
