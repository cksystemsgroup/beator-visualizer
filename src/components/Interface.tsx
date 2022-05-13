import { useState } from "react";
import Model from "../model/Model";
import { ModelNode } from "../model/NodeTypes";
import { createMetrics } from "../model/Result";
import GlobalInfo from "./GlobalInfo";
import Graph from "./Graph";
import LocalInfo from "./LocalInfo";
import Selection from "./Selection";
import Settings from "./Settings";

function Interface({ model }: { model: Model }) {
  const [target, setTarget] = useState<ModelNode>();
  const [selected, setSelected] = useState(model.bads[0]);
  const [autoExpand, setAutoExpand] = useState(true);

  const props = {
    model,
    target,
    setTarget,
    selected,
    setSelected,
    autoExpand,
    setAutoExpand,
    result: createMetrics(model),
  };

  return (
    <>
      <Graph {...props} />
      <LocalInfo {...props} />
      <GlobalInfo {...props} />
      <Selection {...props} />
      <Settings {...props} />
    </>
  );
}

export default Interface;
