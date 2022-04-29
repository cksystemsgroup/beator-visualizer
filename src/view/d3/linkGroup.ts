import { Group, LineGroup } from "./types";

function linkGroup(group: Group) {
  return group
    .append("g")
    .attr("stroke", "#000")
    .attr("stroke-width", 1.5)
    .selectAll("line") as LineGroup;
}

export default linkGroup;
