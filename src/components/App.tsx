import { useState } from "react";
import ModelProcessor from "../model/ModelProcessor";
import Graph from "./Graph";
import GlobalInfo from "./GlobalInfo";
import LocalInfo from "./LocalInfo";
import Selection from "./Selection";

import "../style.css";
import Form from "./Form";
import { createMetrics } from "../model/Result";

function App() {
  const [text, setText] = useState("");
  const [unroll, setUnroll] = useState<number>();

  const readText = (file: File | undefined, unroll: number) => {
    file?.text().then((text) => setText(text));
    setUnroll(unroll);
  };

  if (text === "") return <Form readText={readText} />;

  const mb = new ModelProcessor(text, unroll || 0);

  return (
    <>
      <Graph model={mb.model} />
      <LocalInfo />
      <GlobalInfo result={createMetrics(mb.model)} />
      <Selection />
    </>
  );
}

export default App;
