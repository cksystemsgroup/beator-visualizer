import { useEffect, useRef } from "react";
import * as d3 from "d3";
import Model from "../model/Model";
import { ForceLink } from "d3";

type Node = { index: number; x?: number; y?: number };
type Link = { source: Node; target: Node };
type Circle = d3.Selection<SVGCircleElement, Node, SVGGElement, unknown>;
type Line = d3.Selection<SVGLineElement, Link, SVGGElement, unknown>;

const n1 = { index: 1 };
const n2 = { index: 2 };
const n3 = { index: 3 };
const n4 = { index: 4 };

let nodes = [n1, n2, n3]; // TODO
let links = [
  { source: n1, target: n2 },
  { source: n1, target: n3 },
]; // TODO

export default function DagComponent({ model }: { model: Model }) {
  const ref = useRef(null);

  useEffect(() => {
    const selectPart = () =>
      d3
        .select(ref.current)
        .attr("width", 1500)
        .attr("height", 800)
        .append("g")
        .attr("transform", "translate(" + 1500 / 2 + "," + 800 / 2 + ")");

    const linkPart = () =>
      g
        .append("g")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
        .selectAll("line") as Line;

    const nodePart = () =>
      g
        .append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle") as Circle;

    const simulationPart = () =>
      d3
        .forceSimulation<Node, Link>(nodes)
        .force("charge", d3.forceManyBody<Node>().strength(-2000))
        .force("link", d3.forceLink(links).distance(150))
        .force("center", d3.forceCenter())
        .on("tick", ticked);

    const update = () => {
      node = node.data(nodes, (d) => d.index);
      node.exit().remove();
      node = node
        .enter()
        .append("circle")
        .attr("fill", "#ccc")
        .attr("r", 10)
        .on("click", () => {
          if (!nodes.includes(n4)) {
            nodes.push(n4);
            links.push({ source: n1, target: n4 });
          } else {
            nodes.pop();
            links.pop();
          }
          update();
        })
        .merge(node);

      link = link.data(links, (d) => `${d.source.index}-${d.target.index}`);
      link.exit().remove();
      link = link.enter().append("line").merge(link);

      simulation.nodes(nodes);
      simulation.force<ForceLink<Node, Link>>("link")?.links(links);
      simulation.alpha(1).restart();
    };

    const ticked = () => {
      link
        .attr("x1", (d) => d.source.x || 0)
        .attr("y1", (d) => d.source.y || 0)
        .attr("x2", (d) => d.target.x || 0)
        .attr("y2", (d) => d.target.y || 0);

      node.attr("cx", (d) => d.x || 0).attr("cy", (d) => d.y || 0);
    };

    const g = selectPart();
    let link = linkPart();
    let node = nodePart();
    const simulation = simulationPart();

    update();
  });

  return <svg ref={ref} />;
}
