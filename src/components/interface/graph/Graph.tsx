import { useEffect, useRef } from "react";
import updateGraph from "../../../view/d3/update-graph";
import setupGraph from "../../../view/d3/setup-graph";
import { ModelNode } from "../../../types/node-types";
import reset from "../../../view/reset";
import expand from "../../../view/d3/expand";
import { ClumpObject, SetGraphNodeQ } from "../../../types/react-types";
import { Model } from "../../../types/model-types";

function Graph({
  model,
  setTarget,
  selected,
  autoExpand,
  clump: {
    clumpIf,
    clumpLogic,
    clumpConst,
    clumpState,
    clumpWrite,
    clumpArith,
    clumpInput,
  },
}: {
  model: Model;
  setTarget: SetGraphNodeQ;
  selected: ModelNode;
  autoExpand: boolean;
  clump: ClumpObject;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    reset(model, setTarget, ref.current!);
    const [state, sim] = setupGraph(ref.current!, selected);

    if (
      autoExpand ||
      clumpIf ||
      clumpLogic ||
      clumpConst ||
      clumpState ||
      clumpWrite ||
      clumpArith ||
      clumpInput
    )
      expand(state, selected);
    updateGraph(state, sim, model, setTarget, {
      clumpIf,
      clumpLogic,
      clumpConst,
      clumpState,
      clumpWrite,
      clumpArith,
      clumpInput,
    });
  }, [
    model,
    setTarget,
    selected,
    autoExpand,
    clumpIf,
    clumpLogic,
    clumpConst,
    clumpState,
    clumpWrite,
    clumpArith,
    clumpInput,
  ]);

  return <svg ref={ref} />;
}

export default Graph;
