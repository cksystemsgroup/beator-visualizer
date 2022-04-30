import { useState } from "react";
import Model from "../model/Model";
import { ModelNode } from "../model/NodeTypes";
import { createMetrics } from "../model/Result";
import GlobalInfo from "./GlobalInfo";
import Graph from "./Graph";
import LocalInfo from "./LocalInfo";
import Selection from "./Selection";

function Interface({ model }: { model: Model }) {
  const [target, setTarget] = useState<ModelNode>();
  const [selected, setSelected] = useState(model.bads[0]);

  return (
    <>
      <Graph model={model} setTarget={setTarget} selected={selected} />
      <LocalInfo target={target} />
      <GlobalInfo result={createMetrics(model)} />
      <Selection model={model} selected={selected} setSelected={setSelected} />
    </>
  );
}

export default Interface;
