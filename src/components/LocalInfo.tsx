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
          <li>{target.nid}</li>
          <li>local</li>
          <li>local</li>
        </ul>
      )}
    </details>
  );
}

export default LocalInfo;
