import { Metrics } from "../../../types/model-types";

function GlobalInfo({ result }: { result: Metrics }) {
  return (
    <details className="global" open>
      <summary>Global Information</summary>
      <ul>
        <li>
          <b>Size:</b> {result.nrOfNodes} nodes
        </li>
        <li>
          <b>Bads:</b> {result.nrOfBads} bad instructions
        </li>
        <li>
          <b>States:</b> {result.nrOfStates} PCs + registers
        </li>
        <li>
          <b>Longest Path:</b> {result.longestPathLength} nodes long
        </li>
        <li>
          <b>Max Entanglement:</b> {result.maxEntanglement} nodes
        </li>
      </ul>
    </details>
  );
}

export default GlobalInfo;
