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
      "If-then-else",
      [NodeType.Ite],
      graphState
    );

  if (clumpLogic)
    [nodeCandidates, linkCandidates] = clumper(
      nodeCandidates,
      linkCandidates,
      "Logic",
      [NodeType.And, NodeType.Eq, NodeType.Ult, NodeType.Not],
      graphState
    );

  if (clumpConst)
    [nodeCandidates, linkCandidates] = clumper(
      nodeCandidates,
      linkCandidates,
      "Constant",
      [NodeType.Const],
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
        NodeType.Add,
        NodeType.Sub,
        NodeType.Div,
        NodeType.Ext,
        NodeType.Mul,
        NodeType.Rem,
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
    .attr("class", (d) => d.nodeClass)
    .attr("r", (d) => d.radius)
    .attr("nid", (d) => d.id)
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
    .attr("marker-end", (d) =>
      d.sort !== SortType.Clump ? "url(#triangle)" : ""
    )
    .attr("stroke-width", (d) => {
      switch (d.sort) {
        case SortType.Clump:
          return 2;
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
    })
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

      if (x.target.sort === SortType.Clump) console.log("here");
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

export default updateGraph;
