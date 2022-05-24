import * as d3 from "d3";
import { CircleGroup, Group, LineGroup } from "../../types/graph-types";

export function svgGroup(element: Element) {
  return d3
    .select(element)
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight)
    .append("g")
    .attr(
      "transform",
      "translate(" + window.innerWidth / 2 + "," + window.innerHeight / 2 + ")"
    );
}

export function nodeGroup(group: Group) {
  return group
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle") as CircleGroup;
}

export function linkGroup(group: Group) {
  return group
    .append("g")
    .attr("stroke", "#333")
    .attr("stroke-width", 1.5)
    .selectAll("line") as LineGroup;
}

export function applyMarker(group: Group) {
  const defs = group.append("defs");

  defs
    .append("marker")
    .attr("id", "triangle")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 1)
    .attr("refY", 0)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("markerUnits", "userSpaceOnUse")
    .attr("orient", "auto")
    .append("path")
    .style("fill", "#333")
    .attr("d", "M0,-5L10,0L0,5");

  defs
    .append("marker")
    .attr("id", "triangleR")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 1)
    .attr("refY", 0)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("markerUnits", "userSpaceOnUse")
    .attr("orient", "auto")
    .append("path")
    .style("fill", "#f00")
    .attr("d", "M0,-5L10,0L0,5");
}
