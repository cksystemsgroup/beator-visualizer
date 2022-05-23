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
      <li className="dependancy-details">
        <details>
          <summary>
            <b>Dependancy:</b>{" "}
            {Object.values(n.stats.dependancy).reduce((a, x) => a + x, 0)}
          </summary>
          <ul>
            {Object.entries(n.stats.dependancy).map(
              ([x, y]) =>
                y !== 0 && (
                  <li key={x}>
                    <b>{x}: </b> {y}
                  </li>
                )
            )}
          </ul>
        </details>
      </li>
    </ul>
  );
}

export default NodeInfo;
