import { useState } from "react";
import Model from "../model/Model";
import { ModelNode } from "../model/NodeTypes";
import { createMetrics } from "../model/Result";
import GlobalInfo from "./GlobalInfo";
import Graph from "./Graph";
import LocalInfo from "./LocalInfo";
import Selection from "./Selection";
import Sandwich from "./Sandwich";

function Interface({ model }: { model: Model }) {
  const [target, setTarget] = useState<ModelNode>();
  const [selected, setSelected] = useState(model.bads[0]);
  const [autoExpand, setAutoExpand] = useState(true);

  const [clumpIf, setClumpIf] = useState(false);
  const [clumpLogic, setClumpLogic] = useState(false);
  const [clumpConst, setClumpConst] = useState(false);
  const [clumpState, setClumpState] = useState(false);
  const [clumpWrite, setClumpWrite] = useState(false);
  const [clumpArith, setClumpArith] = useState(false);

  const props = {
    model,
    target,
    setTarget,
    selected,
    setSelected,
    autoExpand,
    setAutoExpand,
    result: createMetrics(model),
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
