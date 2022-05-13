import Model from "../../model/Model";
import clickNode from "./clickNode";
import { GraphState, Simulation, TargetFunction } from "./types";
import updateGraph from "./updateGraph";

function nodeOnClick(
  d: { target: Element },
  model: Model,
  graphState: GraphState,
  simulation: Simulation,
  setTarget: TargetFunction
) {
  const oldTargetElement = document.querySelector(".clicked");
  const newTargetElement = d.target;
  const clickedNode = model.nodes.get(
    parseInt(newTargetElement.getAttribute("nid")!)
  )!;

  if (oldTargetElement !== newTargetElement) {
    oldTargetElement?.classList.remove("clicked");
    oldTargetElement?.setAttribute("r", "10");

    newTargetElement.classList.add("clicked");
    newTargetElement.setAttribute("r", "15");

    setTarget(clickedNode);
  } else {
    clickNode(clickedNode, graphState);
    updateGraph(graphState, simulation, model, setTarget);
  }
}

export default nodeOnClick;
