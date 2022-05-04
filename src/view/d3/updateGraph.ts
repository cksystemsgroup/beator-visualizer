import { ForceLink } from "d3";
import Model from "../../model/Model";
import drag from "./drag";
import nodeOnClick from "./nodeOnClick";
import { GraphState, Link, NodeD3, Simulation, TargetFunction } from "./types";

function updateGraph(
  graphState: GraphState,
  simulation: Simulation,
  {
    model,
    setTarget,
  }: {
    model: Model;
    setTarget: TargetFunction;
  }
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
    .attr("r", 10)
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
    .append("line")
    .merge(graphState.linkGroup)
    .attr("marker-end", "url(#triangle)");

  simulation.nodes(Array.from(graphState.nodes.values()));
  simulation
    .force<ForceLink<NodeD3, Link>>("link")
    ?.links(Array.from(graphState.links.values()).flat());
  simulation.alpha(1).restart();
}

export default updateGraph;
