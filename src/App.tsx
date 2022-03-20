import { ChangeEvent, useState } from "react";
import ModelBuilder from "./ModelBuilder";

function App() {
  const [text, setText] = useState("");

  const readText = (event: ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.files
      ?.item(0)
      ?.text()
      ?.then((text) => setText(text));
  };

  if (text === "")
    return <input type="file" onChange={readText} accept=".btor2" />;

  // TODO: do calculations with text
  const mb = new ModelBuilder(text);

  // TODO: display results
  return <>Results will be displayed here!</>;
}

export default App;
