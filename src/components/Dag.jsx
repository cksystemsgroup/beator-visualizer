import { useEffect, useRef } from "react";
import * as d3 from "d3";
import Model from "../model/Model";

const n1 = { id: 1 };
const n2 = { id: 2 };
const n3 = { id: 3 };
const n4 = { id: 4 };

let nodes = [n1, n2, n3]; // TODO
let links = [
  { source: n1, target: n2 },
  { source: n1, target: n3 },
]; // TODO

export default function DagComponent({ model }) {
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
        .selectAll("line");

    const nodePart = () =>
      g
        .append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle");

    const simulationPart = () =>
      d3
        .forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-2000))
        .force("link", d3.forceLink(links).distance(150))
        .force("center", d3.forceCenter())
        .on("tick", ticked);

    const update = () => {
      node = node.data(nodes, (d) => d.id);
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

      link = link.data(links, (d) => `${d.source.id}-${d.target.id}`);
      link.exit().remove();
      link = link.enter().append("line").merge(link);

      simulation.nodes(nodes);
      simulation.force("link").links(links);
      simulation.alpha(1).restart();
    };

    const ticked = () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    };

    const g = selectPart();
    let link = linkPart();
    let node = nodePart();
    const simulation = simulationPart();

    update();
  });

  return <svg ref={ref} />;
}
