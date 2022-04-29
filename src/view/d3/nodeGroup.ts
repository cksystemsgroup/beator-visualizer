import { CircleGroup, Group } from "./types";

function nodeGroup(group: Group) {
  return group
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle") as CircleGroup;
}

export default nodeGroup;
