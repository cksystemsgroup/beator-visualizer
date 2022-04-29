import { Group } from "./types";

function applyMarker(group: Group) {
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

export default applyMarker;
