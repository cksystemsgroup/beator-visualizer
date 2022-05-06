import { useState } from "react";
import ModelProcessor from "../model/ModelProcessor";

import "../style.css";
import Form from "./Form";
import Interface from "./Interface";

function App() {
  const [text, setText] = useState("");

  const readText = (file: File) => {
    file?.text().then((text) => setText(text));
  };

  if (text === "") return <Form readText={readText} />;

  const mb = new ModelProcessor(text);

  return <Interface model={mb.model} />;
}

export default App;
