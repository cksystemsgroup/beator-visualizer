import { useEffect, useRef } from "react";
import * as d3 from "d3";
import Model from "../model/Model";

type Node = { index: number; x: number; y: number };
type Link = { source: Node; target: Node };
type Selection = d3.Selection<null, unknown, null, undefined>;
type Circle = d3.Selection<
  d3.BaseType | SVGCircleElement,
  Node,
  SVGGElement,
  unknown
>;
type Line = d3.Selection<
  d3.BaseType | SVGLineElement,
  Link,
  SVGGElement,
  unknown
>;

export default function DagComponent({ model }: { model: Model }) {
  const ref = useRef(null);
  const n1 = { index: 1, x: 50, y: 50 };
  const n2 = { index: 2, x: 50, y: 50 };
  const n3 = { index: 3, x: 0, y: 0 };

  useEffect(() => {
    const nodes: Node[] = [n1, n2, n3]; // TODO
    const links: Link[] = [
      { source: n1, target: n2 },
      { source: n1, target: n3 },
    ]; // TODO

    const svg = selectPart(ref);

    const link = linkPart(svg, links);
    const node = nodePart(svg, nodes);
    const simulation = simulationPart(nodes, links, node, link);
  });

  return <svg ref={ref} />;
}

const selectPart = (ref: React.MutableRefObject<null>) =>
  d3.select(ref.current).attr("width", 1500).attr("height", 800);

const nodePart = (svg: Selection, nodes: Node[]) =>
  svg
    .append("g")
    .attr("fill", "#333")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 10);

const linkPart = (svg: Selection, links: Link[]) =>
  svg
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-width", 2)
    .selectAll("line")
    .data(links)
    .join("line");

const simulationPart = (
  nodes: Node[],
  links: Link[],
  node: Circle,
  link: Line
) => {
  const forceLink = d3.forceLink(links);
  const ticked = () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  };

  return d3
    .forceSimulation(nodes)
    .force("link", forceLink)
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(750, 400))
    .on("tick", ticked);
};
