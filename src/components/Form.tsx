import { useState } from "react";
import exampleModel from "../model/example-model";
import { SetStringQ } from "../types/react-types";

function Form({ setText }: { setText: SetStringQ }) {
  let [file, setFile] = useState<File>();
  return (
    <form className="file-form">
      Select a valid BEATOR2 Model File <br />
      <input
        type="file"
        accept=".btor2"
        onChange={(e) => setFile(e.currentTarget.files!.item(0)!)}
      />
      <br />
      <input
        type="button"
        disabled={!file}
        onClick={() => file!.text().then(setText)}
        value="Evaluate Model"
      />
      <br />
      Or <br />
      <input
        type="button"
        onClick={() => setText(exampleModel)}
        value="Use example file"
      />
    </form>
  );
}

export default Form;
