import { useState } from "react";
import processModel from "../model/model-processor";

import "../style.css";
import Form from "./Form";
import Interface from "./interface/Interface";

function App() {
  const [text, setText] = useState<string>();

  if (!text) return <Form setText={setText} />;

  return <Interface model={processModel(text)} text={text} />;
}

export default App;
