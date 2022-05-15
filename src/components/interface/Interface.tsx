import { useState } from "react";
import GlobalInfo from "./global/GlobalInfo";
import Graph from "./graph/Graph";
import LocalInfo from "./local/LocalInfo";
import Selection from "./selection/Selection";
import Sandwich from "./sandwich/Sandwich";
import { GraphNode } from "../../types/graph-types";
import { Metrics, Model } from "../../types/model-types";

function Interface({ model }: { model: Model }) {
  const [target, setTarget] = useState<GraphNode>();
  const [selected, setSelected] = useState(model.bads[0]);
  const [autoExpand, setAutoExpand] = useState(true);

  const [clumpIf, setClumpIf] = useState(false);
  const [clumpLogic, setClumpLogic] = useState(false);
  const [clumpConst, setClumpConst] = useState(false);
  const [clumpState, setClumpState] = useState(false);
  const [clumpWrite, setClumpWrite] = useState(false);
  const [clumpArith, setClumpArith] = useState(false);
  const [clumpInput, setClumpInput] = useState(false);

  const props = {
    model,
    target,
    setTarget,
    selected,
    setSelected,
    autoExpand,
    setAutoExpand,
    result: new Metrics(model),
    clump: {
      clumpIf,
      setClumpIf,
      clumpLogic,
      setClumpLogic,
      clumpConst,
      setClumpConst,
      clumpState,
      setClumpState,
      clumpWrite,
      setClumpWrite,
      clumpArith,
      setClumpArith,
      clumpInput,
      setClumpInput,
    },
  };

  return (
    <>
      <Graph {...props} />
      <LocalInfo {...props} />
      <GlobalInfo {...props} />
      <Selection {...props} />
      <Sandwich {...props} />
    </>
  );
}

export default Interface;
