import { useEffect, useRef } from "react";
import Model from "../model/Model";
import updateGraph from "../view/d3/updateGraph";
import setupGraph from "../view/d3/setupGraph";
import { TargetFunction } from "../view/d3/types";
import autoExpand from "../view/d3/autoExpand";

function Graph({
  model,
  setTarget,
}: {
  model: Model;
  setTarget: TargetFunction;
}) {
  const ref = useRef(null);

  useEffect(() => {
    const [state, sim] = setupGraph(model, ref.current);

    autoExpand(model, state);

    updateGraph(state, sim, { model, setTarget });
  }, [model, setTarget]);

  return <svg ref={ref} />;
}

export default Graph;
