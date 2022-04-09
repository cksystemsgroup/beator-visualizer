import { useEffect, useRef } from "react";
import * as d3 from "d3";
import Model from "../model/Model";
import { ForceLink } from "d3";
import { Bad, InstructionNode } from "../model/NodeTypes";

type Node = { index: number; x?: number; y?: number; nid: number };
type Link = { source: Node; target: Node };
type Circle = d3.Selection<SVGCircleElement, Node, SVGGElement, unknown>;
type Line = d3.Selection<SVGLineElement, Link, SVGGElement, unknown>;

export default function DagComponent({ model }: { model: Model }) {
  const ref = useRef(null);
  let nodes = new Map<number, Node>();
  nodes.set(model.bads[0].nid, {
    index: model.bads[0].nid,
    nid: model.bads[0].nid,
  });
  let links = new Map<number, Link[]>();

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
        .forceSimulation<Node, Link>(Array.from(nodes.values()))
        .force("charge", d3.forceManyBody<Node>().strength(-2000))
        .force(
          "link",
          d3.forceLink(Array.from(links.values()).flat()).distance(150)
        )
        .force("center", d3.forceCenter())
        .on("tick", ticked);

    const onClick = (d: {
      target: { getAttribute: (arg0: string) => string };
    }) => {
      const nid = parseInt(d.target.getAttribute("nid"));
      const n = model.nodes.get(nid);
      console.log(typeof n);

      if (!(n instanceof Bad || n instanceof InstructionNode))
        throw new Error("How did we get here? 🤔");

      if (!n) throw new Error("Could not find clicked Node in model. 💀");

      if (n.collapsed) {
        n.parents.forEach((m) => {
          const newNode = { index: m.nid, nid: m.nid };
          const newLink = { source: nodes.get(nid)!, target: newNode };
          nodes.set(m.nid, newNode);
          setArray(links, m.nid, newLink);
        });
      } else {
        n.parents.forEach((m) => {
          nodes.delete(m.nid);
          links.delete(m.nid);
        });
      }

      n.collapsed = !n.collapsed;
      update();
    };

    const update = () => {
      node = node.data(Array.from(nodes.values()));
      node.exit().remove();
      node = node
        .enter()
        .append("circle")
        .attr("fill", "#ccc")
        .attr("r", 10)
        .attr("nid", (d) => d.nid)
        .on("click", onClick)
        .merge(node);

      link = link.data(Array.from(links.values()).flat());
      link.exit().remove();
      link = link.enter().append("line").merge(link);

      simulation.nodes(Array.from(nodes.values()));
      simulation
        .force<ForceLink<Node, Link>>("link")
        ?.links(Array.from(links.values()).flat());
      simulation.alpha(1).restart();
    };

    const ticked = () => {
      link
        .attr("x1", (d) => d.source.x!)
        .attr("y1", (d) => d.source.y!)
        .attr("x2", (d) => d.target.x!)
        .attr("y2", (d) => d.target.y!);

      node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
    };

    const g = selectPart();
    let link = linkPart();
    let node = nodePart();
    const simulation = simulationPart();

    const zoom = d3.zoom<any, unknown>().on("zoom", function (event) {
      g.selectAll("g").attr("transform", event.transform);
    });

    d3.select(ref.current).call(zoom);

    update();
  });

  return <svg ref={ref} />;
}

const setArray = (m: Map<unknown, unknown[]>, k: unknown, v: unknown) => {
  if (m.has(k)) m.get(k)!.push(v);
  else m.set(k, [v]);
};
