import Model from "../../model/Model";
import clickNode from "./clickNode";
import { GraphState, Simulation, TargetFunction } from "./types";
import updateGraph from "./updateGraph";

let t: Element | undefined;

function nodeOnClick(
  d: { target: Element },
  model: Model,
  graphState: GraphState,
  simulation: Simulation,
  setTarget: TargetFunction
) {
  const nid = parseInt(d.target.getAttribute("nid")!);
  if (!(parseInt(t?.getAttribute("nid")!) === nid)) {
    t?.setAttribute("class", t.getAttribute("class")!.split(" ")[0]);
    t?.setAttribute("r", "10");
    d.target.setAttribute("class", `${d.target.getAttribute("class")} clicked`);
    d.target.setAttribute("r", "15");
    setTarget(model.nodes.get(nid)!);
    t = d.target;
  } else {
    clickNode(nid, model, graphState);
    updateGraph(graphState, simulation, { model, setTarget });
  }
}

export default nodeOnClick;
