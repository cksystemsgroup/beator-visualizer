import { ModelNode } from "../../../types/node-types";

function NodeInfo({ n }: { n: ModelNode }) {
  return (
    <ul>
      <li>
        <b>NID:</b> {n.nid}
      </li>
      {n.sort && (
        <li>
          <b>Sort:</b> {n.sort}
        </li>
      )}
      {n.name && (
        <li>
          <b>Name:</b> {n.name}
        </li>
      )}
      <li>
        <b>Class:</b> {n.nodeClass}
      </li>
      {n.immediate !== undefined && (
        <li>
          <b>Value:</b> {n.immediate}
        </li>
      )}
      <li>
        <b>Depth:</b> {n.stats.depth}
      </li>
      <li>
        <b>Dependancy:</b> {n.stats.dependancy}
      </li>
    </ul>
  );
}

export default NodeInfo;
