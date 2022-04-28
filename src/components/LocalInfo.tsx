import { ModelNode } from "../model/NodeTypes";
import "../style.css";

function LocalInfo({
  target,
}: {
  target: React.MutableRefObject<ModelNode | null>;
}) {
  return (
    <details className="local" open>
      <summary>Local Information</summary>
      {!target.current ? (
        <p>No node selected!</p>
      ) : (
        <ul>
          <li>{target.current?.nid}</li>
          <li>local</li>
          <li>local</li>
        </ul>
      )}
    </details>
  );
}

export default LocalInfo;
