import { useState } from "react";
import processModel from "../model/ModelProcessor";

import "../style.css";
import Form from "./Form";
import Interface from "./Interface";

function App() {
  const [text, setText] = useState<string>();

  if (!text) return <Form setText={setText} />;

  return <Interface model={processModel(text)} />;
}

export default App;
