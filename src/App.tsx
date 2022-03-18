import { ChangeEvent } from "react";

function App() {
  return <input type="file" onChange={beginProcessing} />;
}

function beginProcessing(event: ChangeEvent<HTMLInputElement>) {
  extractLines(event)?.then((x) => console.log(x));
}

function extractLines(
  event: ChangeEvent<HTMLInputElement>
): Promise<string> | undefined {
  return event.currentTarget.files?.item(0)?.text();
}

export default App;
