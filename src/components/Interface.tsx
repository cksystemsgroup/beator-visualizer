import { useRef } from "react";
import Model from "../model/Model";
import { ModelNode } from "../model/NodeTypes";
import { createMetrics } from "../model/Result";
import GlobalInfo from "./GlobalInfo";
import Graph from "./Graph";
import LocalInfo from "./LocalInfo";
import Selection from "./Selection";

function Interface({ model }: { model: Model }) {
  const target = useRef<ModelNode | null>(null);

  return (
    <>
      <Graph model={model} target={target} />
      <LocalInfo target={target} />
      <GlobalInfo result={createMetrics(model)} />
      <Selection />
    </>
  );
}

export default Interface;
