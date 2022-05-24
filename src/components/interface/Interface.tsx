import { useState } from "react";
import GlobalInfo from "./global/GlobalInfo";
import Graph from "./graph/Graph";
import LocalInfo from "./local/LocalInfo";
import Selection from "./selection/Selection";
import Sandwich from "./sandwich/Sandwich";
import { GraphNode } from "../../types/graph-types";
import { Metrics, Model } from "../../types/model-types";
import ModelFile from "../ModelFile";

function Interface({ model, text }: { model: Model; text: string }) {
  const [target, setTarget] = useState<GraphNode>();
  const [selected, setSelected] = useState(model.roots[0]);
  const [autoExpand, setAutoExpand] = useState(true);

  const [clumpIf, setClumpIf] = useState(false);
  const [clumpLogic, setClumpLogic] = useState(false);
  const [clumpConst, setClumpConst] = useState(false);
  const [clumpState, setClumpState] = useState(false);
  const [clumpWrite, setClumpWrite] = useState(false);
  const [clumpArith, setClumpArith] = useState(false);
  const [clumpInput, setClumpInput] = useState(false);

  const [showPath, setShowPath] = useState(false);
  const [showFile, setShowFile] = useState(false);

  const props = {
    text,
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
    showFile,
    setShowFile,
    showPath,
    setShowPath,
  };

  return (
    <>
      <Graph {...props} />
      <LocalInfo {...props} />
      <GlobalInfo {...props} />
      <Selection {...props} />
      <Sandwich {...props} />
      {showFile && <ModelFile {...props} />}
    </>
  );
}

export default Interface;
