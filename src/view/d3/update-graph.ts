import { ForceLink } from "d3";
import {
  ClumpNode,
  ModelNode,
  NodeType,
  SortType,
} from "../../types/node-types";
import drag from "./drag";
import nodeOnClick from "./node-on-click";
import {
  GraphNode,
  GraphState,
  Link,
  Simulation,
} from "../../types/graph-types";
import { SetGraphNodeQ } from "../../types/react-types";
import { Model } from "../../types/model-types";

function updateGraph(
  graphState: GraphState,
  simulation: Simulation,
  model: Model,
  setTarget: SetGraphNodeQ,
  {
    clumpIf,
    clumpLogic,
    clumpConst,
    clumpState,
    clumpWrite,
    clumpArith,
    clumpInput,
  }: {
    clumpIf: boolean;
    clumpLogic: boolean;
    clumpConst: boolean;
    clumpState: boolean;
    clumpWrite: boolean;
    clumpArith: boolean;
    clumpInput: boolean;
  }
) {
  const onClick = (d: { target: Element }) =>
    nodeOnClick(d, model, graphState, simulation, setTarget, {
      clumpIf,
      clumpLogic,
      clumpConst,
      clumpState,
      clumpWrite,
      clumpArith,
      clumpInput,
    });

  let nodeCandidates = Array.from(graphState.nodes.values());
  let linkCandidates = graphState.links;

  if (clumpIf)
    [nodeCandidates, linkCandidates] = clumper(
      nodeCandidates,
      linkCandidates,
      "IfThenElse",
      [NodeType.IfThenElse],
      graphState
    );

  if (clumpLogic)
    [nodeCandidates, linkCandidates] = clumper(
      nodeCandidates,
      linkCandidates,
      "Logic",
      [NodeType.And, NodeType.Equals, NodeType.LessThan, NodeType.Not],
      graphState
    );

  if (clumpConst)
    [nodeCandidates, linkCandidates] = clumper(
      nodeCandidates,
      linkCandidates,
      "Constant",
      [NodeType.Constant],
      graphState
    );

  if (clumpState)
    [nodeCandidates, linkCandidates] = clumper(
      nodeCandidates,
      linkCandidates,
      "State",
      [NodeType.State],
      graphState
    );

  if (clumpWrite)
    [nodeCandidates, linkCandidates] = clumper(
      nodeCandidates,
      linkCandidates,
      "Write",
      [NodeType.Write],
      graphState
    );

  if (clumpArith)
    [nodeCandidates, linkCandidates] = clumper(
      nodeCandidates,
      linkCandidates,
      "Arithmetic",
      [
        NodeType.Addition,
        NodeType.Subtraction,
        NodeType.Division,
        NodeType.Extend,
        NodeType.Multiplication,
        NodeType.Remainder,
      ],
      graphState
    );

  if (clumpInput)
    [nodeCandidates, linkCandidates] = clumper(
      nodeCandidates,
      linkCandidates,
      "Input",
      [NodeType.Input],
      graphState
    );

  graphState.nodeGroup = graphState.nodeGroup.data(nodeCandidates);
  graphState.nodeGroup.exit().remove();

  graphState.nodeGroup = graphState.nodeGroup
    .enter()
    .append("circle")
    .attr("class", (d) => {
      if (
        d instanceof ModelNode &&
        d.nodeClass === NodeType.State &&
        d.parents.length === 0
      )
        return "Input";
      else return d.nodeClass;
    })
    .attr("r", (d) => d.radius)
    .attr("nid", (d) => d.id)
    .style("cursor", "pointer")
    .attr("fill", (d) => getColor(d)!)
    .on("click", onClick)
    .call(drag(simulation) as any)
    .merge(graphState.nodeGroup);

  graphState.nodeGroup.append("title").text(({ nodeClass: t }) => t);

  graphState.linkGroup = graphState.linkGroup.data(linkCandidates);
  graphState.linkGroup.exit().remove();
  graphState.linkGroup = graphState.linkGroup
    .enter()
    .append("path")
    .merge(graphState.linkGroup)
    .attr("marker-end", (d) => {
      if (linkOnPath(d)) return "url(#triangleR)";
      if (d.sort !== SortType.Clump) return "url(#triangle)";
      return "";
    })
    .attr("stroke-width", (d) => {
      const multiplier = linkOnPath(d) ? 2 : 1;
      switch (d.sort) {
        case SortType.Clump:
          return multiplier * 2;
        case SortType.Boolean:
          return multiplier * 1;
        case SortType.Bytes:
          return multiplier * 1.5;
        case SortType.Word:
          return multiplier * 2;
        case SortType.Memory:
          return multiplier * 5;
        default:
          return multiplier * 2;
      }
    })
    .style("stroke", (d) => (linkOnPath(d) ? "#f00" : "333"))
    .attr("stroke-dasharray", (d) => (d.sort === SortType.Clump ? "4 4" : ""));

  simulation.nodes(nodeCandidates);
  simulation.force<ForceLink<GraphNode, Link>>("link")?.links(linkCandidates);
  simulation.alpha(1).restart();
}

function clumper(
  nodeCandidates: GraphNode[],
  linkCandidates: Link[],
  clumpType: string,
  types: NodeType[],
  graphState: GraphState
): [GraphNode[], Link[]] {
  const nrOfFiltered = nodeCandidates.filter((x) => typer(types, x)).length;
  nodeCandidates = nodeCandidates.filter((x) => !typer(types, x));
  const newClump: ClumpNode = {
    id: clumpType,
    x: 0,
    y: 0,
    nodeClass: clumpType,
    radius: 20,
    size: nrOfFiltered,
    sort: SortType.Clump,
    minDepth: Infinity,
    maxDepth: 0,
  };

  linkCandidates.forEach((x) => {
    if (typer(types, x.source)) {
      if (
        x.source instanceof ModelNode &&
        x.source.stats.depth < newClump.minDepth
      )
        newClump.minDepth = x.source.stats.depth;
      if (
        x.source instanceof ModelNode &&
        x.source.stats.depth > newClump.maxDepth
      )
        newClump.maxDepth = x.source.stats.depth;

      x.source = newClump;
    }

    if (typer(types, x.target)) {
      if (
        x.target instanceof ModelNode &&
        x.target.stats.depth < newClump.minDepth
      )
        newClump.minDepth = x.target.stats.depth;

      if (
        x.target instanceof ModelNode &&
        x.target.stats.depth > newClump.maxDepth
      )
        newClump.maxDepth = x.target.stats.depth;

      x.target = newClump;
    }

    if (x.target.sort === SortType.Clump && x.source.sort === SortType.Clump)
      x.sort = SortType.Clump;
  });

  if (nrOfFiltered) {
    nodeCandidates.push(newClump);
    graphState.clumps.set(clumpType, newClump);
  }
  return [nodeCandidates, [...new Set(linkCandidates)]];
}

function typer(types: NodeType[], n: GraphNode) {
  for (const type of types) {
    if (n.nodeClass === type) return true;
  }

  return false;
}

function linkOnPath(d: Link) {
  return (
    d.source instanceof ModelNode &&
    d.target instanceof ModelNode &&
    d.source.onPath &&
    d.target.onPath &&
    d.source.stats.height - d.target.stats.height === 1
  );
}

function getColor(d: GraphNode) {
  if (
    d instanceof ModelNode &&
    d.nodeClass === NodeType.State &&
    d.parents.length === 0
  )
    return "#59a14f";
  switch (d.nodeClass) {
    case NodeType.Bad:
      return "#e15759";
    case NodeType.Next:
      return "#4e79a5";
    case NodeType.Constant:
      return "#bcbd3b";
    case NodeType.Input:
      return "#59a14f";
    case NodeType.State:
      return "#76b7b2";
    case NodeType.And:
    case NodeType.Equals:
    case NodeType.LessThan:
    case "Logic":
    case NodeType.Not:
      return "#f28e2b";
    case NodeType.IfThenElse:
      return "#b07aa1";
    case NodeType.Addition:
    case "Arithmetic":
    case NodeType.Division:
    case NodeType.Extend:
    case NodeType.Multiplication:
    case NodeType.Remainder:
    case NodeType.Subtraction:
      return "#ff9da7";
    case NodeType.Read:
      return "#9c755f";
    case NodeType.Write:
      return "#edc948";
  }
}

export default updateGraph;
