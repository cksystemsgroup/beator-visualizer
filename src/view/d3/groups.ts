import * as d3 from "d3";
import { CircleGroup, Group, LineGroup } from "./types";

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
    .attr("stroke", "#000")
    .attr("stroke-width", 1.5)
    .selectAll("line") as LineGroup;
}

export function applyMarker(group: Group) {
  group
    .append("defs")
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
}
