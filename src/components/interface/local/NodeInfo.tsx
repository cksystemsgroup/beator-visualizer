import { List } from "@mui/material";
import { ModelNode } from "../../../types/node-types";
import { Item, CollapsableItem } from "../../general/ListUtils";

function NodeInfo({ n }: { n: ModelNode }) {
  const u = undefined;

  return (
    <List disablePadding sx={{ maxHeight: "100%", overflow: "auto" }}>
      <Item property="NID" value={n.nid} />
      {n.sort && <Item property="Sort" value={n.sort} />}
      {n.name && <Item property="Name" value={n.name} />}
      <Item property="Class" value={n.nodeClass} />
      {n.immediate !== u && <Item property="Value" value={n.immediate} />}
      <Item property="Depth" value={n.stats.depth} />
      {n.stats.depthS !== -Infinity && (
        <Item property="Depth from State" value={n.stats.depthS} />
      )}
      <CollapsableItem
        title={
          <>
            <b>Dependancy:</b>{" "}
            {Object.values(n.stats.dependancy).reduce((a, x) => a + x.size, 0)}
          </>
        }
        childFn={([x, y]: any) =>
          y.size !== 0 && <Item key={x} property={x} value={y.size} />
        }
        elements={Object.entries(n.stats.dependancy)}
      />
    </List>
  );
}

export default NodeInfo;
