import { ModelNode } from "../../model/NodeTypes";

export type NodeD3 = {
  index: number;
  x?: number;
  y?: number;
  nid: number;
  type: string;
};
export type Link = { source: NodeD3; target: NodeD3 };
export type CircleGroup = d3.Selection<
  SVGCircleElement,
  NodeD3,
  SVGGElement,
  unknown
>;
export type LineGroup = d3.Selection<
  SVGLineElement,
  Link,
  SVGGElement,
  unknown
>;
export type SvgGroup = d3.Selection<SVGGElement, unknown, null, undefined>;
export type TargetFunction = React.Dispatch<
  React.SetStateAction<ModelNode | undefined>
>;
export type Group = d3.Selection<SVGGElement, unknown, null, undefined>;
export type Simulation = d3.Simulation<NodeD3, Link>;
export type GraphState = {
  nodes: Map<number, NodeD3>;
  links: Map<number, Link[]>;
  nodeGroup: CircleGroup;
  linkGroup: LineGroup;
  svgGroup: SvgGroup;
};
