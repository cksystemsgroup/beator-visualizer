import { useEffect, useRef } from "react";
import * as d3 from "d3";
import Model from "../model/Model";
import { ForceLink } from "d3";
import { ModelNode } from "../model/NodeTypes";

type Node = {
  index: number;
  x?: number;
  y?: number;
  nid: number;
  type: string;
};
type Link = { source: Node; target: Node };
type Circle = d3.Selection<SVGCircleElement, Node, SVGGElement, unknown>;
type Line = d3.Selection<SVGLineElement, Link, SVGGElement, unknown>;

function Graph({ model }: { model: Model }) {
  const ref = useRef(null);
  let nodes = new Map<number, Node>();
  nodes.set(model.bads[0].nid, {
    index: model.bads[0].nid,
    nid: model.bads[0].nid,
    type: model.bads[0].type,
  });
  let links = new Map<number, Link[]>();

  useEffect(() => {
    const selectPart = () =>
      d3
        .select(ref.current)
        .attr("width", window.innerWidth)
        .attr("height", window.innerHeight)
        .append("g")
        .attr(
          "transform",
          "translate(" +
            window.innerWidth / 2 +
            "," +
            window.innerHeight / 2 +
            ")"
        );

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
        .force("x", d3.forceX())
        .on("tick", ticked);

    const onClick = (d: {
      target: { getAttribute: (arg0: string) => string };
    }) => {
      const nid = parseInt(d.target.getAttribute("nid"));
      const n = model.nodes.get(nid);

      if (!n) throw new Error("Could not find clicked Node in model. 💀");

      if (n.view.collapsed) {
        n.parents.forEach((m) => {
          const newNode = nodes.has(m.nid)
            ? nodes.get(m.nid)!
            : { index: m.nid, nid: m.nid, type: m.type };
          const newLink = { source: nodes.get(nid)!, target: newNode };
          nodes.set(m.nid, newNode);
          setArray(links, m.nid, newLink);
        });
      } else {
        const recDel = (m: ModelNode) => {
          m.parents.forEach(recDel);
          m.view.collapsed = true;
          nodes.delete(m.nid);
          links.delete(m.nid);
        };
        n.parents.forEach(recDel);
      }

      n.view.collapsed = !n.view.collapsed;
      update();
    };

    function drag(simulation: d3.Simulation<Node, Link>) {
      function dragstarted(event: {
        active: any;
        subject: { fx: any; x: any; fy: any; y: any };
      }) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: {
        subject: { fx: any; fy: any };
        x: any;
        y: any;
      }) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: {
        active: any;
        subject: { fx: null; fy: null };
      }) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    const update = () => {
      node = node.data(Array.from(nodes.values()));
      node.exit().remove();

      node = node
        .enter()
        .append("circle")
        .attr("fill", "#17BEBB")
        .attr("r", 10)
        .attr("nid", (d) => d.nid)
        .on("click", onClick)
        .call(drag(simulation) as any)
        .merge(node);

      node.append("title").text(({ type: t }) => t);

      link = link.data(Array.from(links.values()).flat());
      link.exit().remove();
      link = link
        .enter()
        .append("line")
        .merge(link)
        .attr("marker-end", "url(#triangle)");

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
    g.append("defs")
      .append("marker")
      .attr("id", "triangle")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 21)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", "#000")
      .attr("d", "M0,-5L10,0L0,5");
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

export default Graph;
