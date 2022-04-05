import { useState } from "react";
import ModelProcessor from "../model/ModelProcessor";
import DagComponent from "./Dag";

function App() {
  const [text, setText] = useState("");
  const [unroll, setUnroll] = useState<number>();

  const readText = (file: File | undefined, unroll: number) => {
    file?.text().then((text) => setText(text));
    setUnroll(unroll);
  };

  if (text === "") return <Form readText={readText} />;

  const mb = new ModelProcessor(text, unroll || 0);

  return <DagComponent nodes={mb.dagify()} />;
}

function Form(props: { readText: any }) {
  let [unroll, setUnroll] = useState(0);
  let [file, setFile] = useState<File>();
  return (
    <div className="form">
      <input
        type="file"
        accept=".btor2"
        onChange={(e) => setFile(e.currentTarget.files?.item(0) || undefined)}
      />{" "}
      <input
        type="number"
        min="0"
        value={unroll}
        onChange={(e) => setUnroll(parseInt(e.target.value))}
      ></input>
      <button disabled={!file} onClick={() => props.readText(file, unroll)}>
        Calculate
      </button>
    </div>
  );
}

export default App;
