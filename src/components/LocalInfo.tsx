import { ModelNode } from "../model/NodeTypes";
import "../style.css";
import { GraphNode } from "../view/d3/types";

function LocalInfo({ target }: { target: GraphNode | undefined }) {
  return (
    <details className="local" open>
      <summary>Local Information</summary>
      {!target ? (
        <p className="no-node">No node selected!</p>
      ) : target instanceof ModelNode ? (
        <ul>
          <li>
            <b>NID:</b> {target.nid}
          </li>
          {target.sort && (
            <li>
              <b>Sort Type:</b> {target.sort}
            </li>
          )}
          {target.name && (
            <li>
              <b>Name:</b> {target.name}
            </li>
          )}
          <li>
            <b>Type:</b> {target.type}
          </li>
          {target.immediate !== undefined && (
            <li>
              <b>Value:</b> {target.immediate}
            </li>
          )}
          <li>
            <b>Depth:</b> {target.stats.depth}
          </li>
          <li>
            <b>Entanglement:</b> {target.stats.entanglement}
          </li>
        </ul>
      ) : (
        <p>Clumperino</p>
      )}
    </details>
  );
}

export default LocalInfo;
