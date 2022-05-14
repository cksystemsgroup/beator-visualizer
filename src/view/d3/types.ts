import { ModelNode, SortType } from "../../model/NodeTypes";

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
export type TargetFunction = React.Dispatch<
  React.SetStateAction<GraphNode | undefined>
>;
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

export type ClumpObject = {
  clumpIf: boolean;
  setClumpIf: React.Dispatch<React.SetStateAction<boolean>>;
  clumpLogic: boolean;
  setClumpLogic: React.Dispatch<React.SetStateAction<boolean>>;
  clumpConst: boolean;
  setClumpConst: React.Dispatch<React.SetStateAction<boolean>>;
  clumpState: boolean;
  setClumpState: React.Dispatch<React.SetStateAction<boolean>>;
  clumpWrite: boolean;
  setClumpWrite: React.Dispatch<React.SetStateAction<boolean>>;
  clumpArith: boolean;
  setClumpArith: React.Dispatch<React.SetStateAction<boolean>>;
  clumpInput: boolean;
  setClumpInput: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ClumpNode = {
  x: number;
  y: number;
  radius: number;
  type: string;
  id: string;
  size: number;
  sort: SortType.Clump;
  minDepth: number;
  maxDepth: number;
};
