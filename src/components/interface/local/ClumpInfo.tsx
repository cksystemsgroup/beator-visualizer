import { Typography } from "@mui/material";
import { ClumpNode } from "../../../types/node-types";
import { Item, MyList } from "../../general/ListUtils";

function ClumpInfo({ n }: { n: ClumpNode }) {
  return (
    <>
      <Typography>
        This is a clump, a collection of one or more nodes of the same kind.
      </Typography>{" "}
      <br />
      <MyList>
        <Item property="Type" value={n.nodeClass} />
        <Item property="Number of contained Nodes" value={n.size} />
        <Item property="Minimum Depth" value={n.minDepth} />
        <Item property="Maximum Depth" value={n.maxDepth} />
      </MyList>
    </>
  );
}

export default ClumpInfo;
