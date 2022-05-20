import { ClumpNode } from "../../../types/node-types";

function ClumpInfo({ n }: { n: ClumpNode }) {
  return (
    <>
      <p>
        This is a clump, a collection of one or more nodes of the same kind.
      </p>
      <ul>
        <li>
          <b>Type:</b> {n.nodeClass}
        </li>
        <li>
          <b>Number of contained Nodes:</b> {n.size}
        </li>
        <li>
          <b>Minimum depth:</b> {n.minDepth}
        </li>
        <li>
          <b>Maximum depth:</b> {n.maxDepth}
        </li>
      </ul>
    </>
  );
}

export default ClumpInfo;
