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

  return (
    <>
      <Graph model={model} setTarget={setTarget} />
      <LocalInfo target={target} />
      <GlobalInfo result={createMetrics(model)} />
      <Selection />
    </>
  );
}

export default Interface;
