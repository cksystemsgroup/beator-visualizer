import * as d3 from "d3";

function svgGroup(element: null) {
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

export default svgGroup;
