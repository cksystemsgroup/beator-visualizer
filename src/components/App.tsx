import { useState } from "react";
import ModelProcessor from "../model/ModelProcessor";

import "../style.css";
import Form from "./Form";
import Interface from "./Interface";

function App() {
  const [text, setText] = useState("");
  const [unroll, setUnroll] = useState<number>();

  const readText = (file: File, unroll: number) => {
    file?.text().then((text) => setText(text));
    setUnroll(unroll);
  };

  if (text === "") return <Form readText={readText} />;

  const mb = new ModelProcessor(text, unroll!);

  return <Interface model={mb.model} />;
}

export default App;
