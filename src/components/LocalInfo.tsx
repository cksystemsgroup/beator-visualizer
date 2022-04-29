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
          <li>
            <b>Type:</b> {target.type}
          </li>
          <li>
            <b>NID:</b> {target.nid}
          </li>
          <li>
            <b>Depth:</b> {target.stats.depth}
          </li>
          <li>
            <b>Entanglement:</b> {target.stats.entanglement}
          </li>
          <li>
            <b>Collapsed:</b> {target.view.collapsed ? "true" : "false"}
          </li>
        </ul>
      )}
    </details>
  );
}

export default LocalInfo;
