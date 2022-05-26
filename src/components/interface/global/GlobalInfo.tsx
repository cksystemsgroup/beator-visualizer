import { Metrics } from "../../../types/model-types";
import Widget from "../../general/Widget";

function GlobalInfo({ result }: { result: Metrics }) {
  return (
    <Widget
      title="Global Information"
      expanded
      sx={{ bottom: "10px", left: "10px" }}>
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
        <li className="dependancy-details">
          <details>
            <summary>
              <b>Longest Path:</b> {result.longestPathLength} nodes long
            </summary>
            <p>{result.longestPathStart.name}</p>
          </details>
        </li>
        <li className="dependancy-details">
          <details>
            <summary>
              <b>Max Dependancy:</b> {result.maxDependancy} nodes
            </summary>
            <p>{result.maxDependantNode.name}</p>
          </details>
        </li>
        <li className="dependancy-details">
          <details>
            <summary>
              <b>Longest Path from State:</b> {result.longestPathLengthS} nodes
              long
            </summary>
            <p>{result.longestPathStartS.name}</p>
          </details>
        </li>
        <li className="dependancy-details">
          <details>
            <summary>
              <b>Max Dependancy from State:</b> {result.maxDependancyS} nodes
            </summary>
            <p>{result.maxDependantNodeS.name}</p>
          </details>
        </li>
      </ul>
    </Widget>
  );
}

export default GlobalInfo;
