import { ModelNode } from "../../../types/node-types";
import { GraphNode } from "../../../types/graph-types";
import ClumpInfo from "./ClumpInfo";
import NodeInfo from "./NodeInfo";

function LocalInfo({ target }: { target: GraphNode | undefined }) {
  return (
    <details className="local" open>
      <summary>Local Information</summary>
      {!target ? (
        <p className="no-node">No node selected!</p>
      ) : target instanceof ModelNode ? (
        <NodeInfo n={target} />
      ) : (
        <ClumpInfo n={target} />
      )}
    </details>
  );
}

export default LocalInfo;
