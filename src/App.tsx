import { ChangeEvent, useState } from "react";

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

  // TODO: display results
  console.log(text);
  return <>Results will be displayed here!</>;
}

export default App;
