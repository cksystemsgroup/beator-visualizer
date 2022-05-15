import { ClumpNode, ModelNode, SortType } from "./node-types";

export type Link = { source: GraphNode; target: GraphNode; sort: SortType };
export type CircleGroup = d3.Selection<
  SVGCircleElement,
  GraphNode,
  SVGGElement,
  unknown
>;
export type GraphNode = ModelNode | ClumpNode;
export type LineGroup = d3.Selection<
  SVGPathElement,
  Link,
  SVGGElement,
  unknown
>;
export type SvgGroup = d3.Selection<SVGGElement, unknown, null, undefined>;
export type Group = d3.Selection<SVGGElement, unknown, null, undefined>;
export type Simulation = d3.Simulation<GraphNode, Link>;
export type GraphState = {
  nodes: Map<number, GraphNode>;
  links: Link[];
  nodeGroup: CircleGroup;
  linkGroup: LineGroup;
  svgGroup: SvgGroup;
  clumps: Map<string, ClumpNode>;
};
