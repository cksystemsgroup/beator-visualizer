import * as d3 from "d3";
import { Group } from "./types";

function zoom(group: Group, element: null) {
  const zoom = d3.zoom<any, unknown>().on("zoom", function (event) {
    group.selectAll("g").attr("transform", event.transform);
  });
  d3.select(element).call(zoom).on("dblclick.zoom", null);
}

export default zoom;
