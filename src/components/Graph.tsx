import { useEffect, useRef } from "react";
import Model from "../model/Model";
import updateGraph from "../view/d3/updateGraph";
import setupGraph from "../view/d3/setupGraph";
import { TargetFunction } from "../view/d3/types";
import autoExpand from "../view/d3/autoExpand";
import { ModelNode } from "../model/NodeTypes";
import reset from "../view/reset";

function Graph({
  model,
  setTarget,
  selected,
}: {
  model: Model;
  setTarget: TargetFunction;
  selected: ModelNode;
}) {
  const ref = useRef(null);

  useEffect(() => {
    reset(model, setTarget, ref.current);
    const [state, sim] = setupGraph(model, ref.current, selected);

    autoExpand(model, state, selected);

    updateGraph(state, sim, { model, setTarget });
  }, [model, setTarget, selected]);

  return <svg ref={ref} />;
}

export default Graph;
