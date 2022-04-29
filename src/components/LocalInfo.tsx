import { ModelNode } from "../model/NodeTypes";
import "../style.css";

function LocalInfo({ target }: { target: ModelNode | undefined }) {
  return (
    <details className="local" open>
      <summary>Local Information</summary>
      {!target ? (
        <p>No node selected!</p>
      ) : (
        <ul>
          {target.name ? (
            <li>
              <b>Name:</b> {target.name}
            </li>
          ) : null}
          <li>
            <b>Type:</b> {target.type}
          </li>
          {target.immediate ? (
            <li>
              <b>Value:</b> {target.immediate}
            </li>
          ) : null}
          <li>
            <b>Depth:</b> {target.stats.depth}
          </li>
          <li>
            <b>Entanglement:</b> {target.stats.entanglement}
          </li>
        </ul>
      )}
    </details>
  );
}

export default LocalInfo;
