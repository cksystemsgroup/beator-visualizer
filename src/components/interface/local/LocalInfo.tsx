import { ModelNode } from "../../../types/node-types";
import { GraphNode } from "../../../types/graph-types";
import ClumpInfo from "./ClumpInfo";
import NodeInfo from "./NodeInfo";
import Widget from "../../general/Widget";
import { Typography } from "@mui/material";

function LocalInfo({ target }: { target?: GraphNode }) {
  return (
    <Widget
      title="Local Information"
      expanded
      sx={{ top: "10px", left: "10px" }}>
      {!target ? (
        <Typography fontStyle="italic" color="#999" mt={2}>
          No node selected!
        </Typography>
      ) : target instanceof ModelNode ? (
        <NodeInfo n={target} />
      ) : (
        <ClumpInfo n={target} />
      )}
    </Widget>
  );
}

export default LocalInfo;
