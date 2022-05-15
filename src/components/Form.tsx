import { useState } from "react";
import exampleModel from "../model/example-model";
import { SetStringQ } from "../types/react-types";

function Form({ setText }: { setText: SetStringQ }) {
  let [file, setFile] = useState<File>();
  return (
    <form>
      <input
        type="file"
        accept=".btor2"
        onChange={(e) => setFile(e.currentTarget.files!.item(0)!)}
      />
      <br />
      <button
        type="button"
        disabled={!file}
        onClick={() => file!.text().then(setText)}>
        Calculate
      </button>
      <br />
      <button type="button" onClick={() => setText(exampleModel)}>
        Use example file
      </button>
    </form>
  );
}

export default Form;
