import Model from "../../model/Model";
import nodeClicked from "./nodeClicked";
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
    t?.setAttribute("fill", "#17BEBB");
    d.target.setAttribute("fill", "#f00");
    setTarget(model.nodes.get(nid)!);
    t = d.target;
  } else {
    nodeClicked(nid, model, graphState);
    updateGraph(graphState, simulation, { model, setTarget });
  }
}

export default nodeOnClick;
