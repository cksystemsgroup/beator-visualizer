import { useEffect, useRef } from "react";
import { GraphProps } from "../../../types/react-types";
import expand from "../../../view/d3/expand";
import setupGraph from "../../../view/d3/setup-graph";
import updateGraph from "../../../view/d3/update-graph";
import reset from "../../../view/reset";

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
  showPath,
}: GraphProps) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    reset(model, setTarget, ref.current!);
    const [state, sim] = setupGraph(ref.current!, selected);

    const clumps = {
      clumpIf,
      clumpLogic,
      clumpConst,
      clumpState,
      clumpWrite,
      clumpArith,
      clumpInput,
    };

    if (
      Object.values(clumps).reduce((a, x) => a || x, false) ||
      autoExpand ||
      showPath
    )
      expand(state, selected, showPath);

    updateGraph(state, sim, model, setTarget, clumps);
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
    showPath,
  ]);

  return <svg ref={ref} />;
}

export default Graph;
