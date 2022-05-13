import { ModelNode, SortType } from "../../model/NodeTypes";

export type Link = { source: ModelNode; target: ModelNode; sort: SortType };
export type CircleGroup = d3.Selection<
  SVGCircleElement,
  ModelNode,
  SVGGElement,
  unknown
>;
export type LineGroup = d3.Selection<
  SVGPathElement,
  Link,
  SVGGElement,
  unknown
>;
export type SvgGroup = d3.Selection<SVGGElement, unknown, null, undefined>;
export type TargetFunction = React.Dispatch<
  React.SetStateAction<ModelNode | undefined>
>;
export type Group = d3.Selection<SVGGElement, unknown, null, undefined>;
export type Simulation = d3.Simulation<ModelNode, Link>;
export type GraphState = {
  nodes: Map<number, ModelNode>;
  links: Link[];
  nodeGroup: CircleGroup;
  linkGroup: LineGroup;
  svgGroup: SvgGroup;
};
