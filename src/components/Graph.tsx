import { useEffect, useRef } from "react";
import Model from "../model/Model";
import updateGraph from "../view/d3/updateGraph";
import setupGraph from "../view/d3/setupGraph";
import { ClumpObject, TargetFunction } from "../view/d3/types";
import { ModelNode } from "../model/NodeTypes";
import reset from "../view/reset";
import expand from "../view/d3/expand";

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
  },
}: {
  model: Model;
  setTarget: TargetFunction;
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
      clumpArith
    )
      expand(state, selected);
    updateGraph(state, sim, model, setTarget, {
      clumpIf,
      clumpLogic,
      clumpConst,
      clumpState,
      clumpWrite,
      clumpArith,
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
  ]);

  return <svg ref={ref} />;
}

export default Graph;
