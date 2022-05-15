import clickNode from "./click-node";
import { GraphState, Simulation } from "../../types/graph-types";
import updateGraph from "./update-graph";
import { SetGraphNodeQ } from "../../types/react-types";
import { Model } from "../../types/model-types";

function nodeOnClick(
  d: { target: Element },
  model: Model,
  graphState: GraphState,
  simulation: Simulation,
  setTarget: SetGraphNodeQ,
  {
    clumpIf,
    clumpLogic,
    clumpConst,
    clumpState,
    clumpWrite,
    clumpArith,
    clumpInput,
  }: {
    clumpIf: boolean;
    clumpLogic: boolean;
    clumpConst: boolean;
    clumpState: boolean;
    clumpWrite: boolean;
    clumpArith: boolean;
    clumpInput: boolean;
  }
) {
  const oldTargetElement = document.querySelector(".clicked");
  const newTargetElement = d.target;
  const clickedNode = model.nodes.get(
    parseInt(newTargetElement.getAttribute("nid")!)
  )!;

  if (oldTargetElement !== newTargetElement) {
    oldTargetElement?.classList.remove("clicked");

    newTargetElement.classList.add("clicked");

    if (clickedNode) setTarget(clickedNode);
    else {
      setTarget(graphState.clumps.get(newTargetElement.getAttribute("nid")!));
    }
  } else if (
    !(
      clumpIf ||
      clumpLogic ||
      clumpConst ||
      clumpState ||
      clumpWrite ||
      clumpArith ||
      clumpInput
    )
  ) {
    clickNode(clickedNode, graphState);
    updateGraph(graphState, simulation, model, setTarget, {
      clumpIf,
      clumpLogic,
      clumpConst,
      clumpState,
      clumpWrite,
      clumpArith,
      clumpInput,
    });
  }
}

export default nodeOnClick;
