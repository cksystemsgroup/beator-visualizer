import { ForceLink } from "d3";
import Model from "../../model/Model";
import { ModelNode, SortType } from "../../model/NodeTypes";
import drag from "./drag";
import nodeOnClick from "./nodeOnClick";
import { GraphState, Link, Simulation, TargetFunction } from "./types";

function updateGraph(
  graphState: GraphState,
  simulation: Simulation,
  model: Model,
  setTarget: TargetFunction
) {
  const onClick = (d: { target: Element }) =>
    nodeOnClick(d, model, graphState, simulation, setTarget);

  graphState.nodeGroup = graphState.nodeGroup.data(
    Array.from(graphState.nodes.values())
  );
  graphState.nodeGroup.exit().remove();

  graphState.nodeGroup = graphState.nodeGroup
    .enter()
    .append("circle")
    .attr("class", (d) => d.type)
    .attr("r", (d) => d.view.radius)
    .attr("nid", (d) => d.nid)
    .on("click", onClick)
    .call(drag(simulation) as any)
    .merge(graphState.nodeGroup);

  graphState.nodeGroup.append("title").text(({ type: t }) => t);

  graphState.linkGroup = graphState.linkGroup.data(
    Array.from(graphState.links.values()).flat()
  );
  graphState.linkGroup.exit().remove();
  graphState.linkGroup = graphState.linkGroup
    .enter()
    .append("path")
    .merge(graphState.linkGroup)
    .attr("marker-end", "url(#triangle)")
    .attr("stroke-width", (d) => {
      switch (d.sort) {
        case SortType.Boolean:
          return 1;
        case SortType.Bytes:
          return 1.5;
        case SortType.Word:
          return 2;
        case SortType.Memory:
          return 5;
        default:
          return 2;
      }
    });

  simulation.nodes(Array.from(graphState.nodes.values()));
  simulation
    .force<ForceLink<ModelNode, Link>>("link")
    ?.links(Array.from(graphState.links.values()).flat());
  simulation.alpha(1).restart();
}

export default updateGraph;
