import { List } from "@mui/material";
import { Metrics } from "../../../types/model-types";
import { CollapsableItem, Item } from "../../general/ListUtils";
import Widget from "../../general/Widget";

function GlobalInfo({ result }: { result: Metrics }) {
  return (
    <Widget
      title="Global Information"
      expanded
      sx={{ bottom: "10px", left: "10px" }}>
      <List disablePadding sx={{ maxHeight: "100%", overflow: "auto" }}>
        <Item property="Size" value={result.nrOfNodes} unit="nodes" />
        <Item property="Bads" value={result.nrOfBads} unit="bad instructions" />
        <Item
          property="States"
          value={result.nrOfStates}
          unit="PCs + registers"
        />
        <CollapsableItem
          title={
            <>
              <b>Longest Path:</b> {result.longestPathLength} nodes long
            </>
          }
          elements={[result.longestPathStart.name]}
          childFn={(x: string) => <Item property="Source Node" value={x} />}
        />
        <CollapsableItem
          title={
            <>
              <b>Longest Path from State:</b> {result.longestPathLengthS} nodes
              long
            </>
          }
          elements={[result.longestPathStartS.name]}
          childFn={(x: string) => <Item property="Source Node" value={x} />}
        />
        <CollapsableItem
          title={
            <>
              <b>Max Dependancy:</b> {result.maxDependancy} nodes
            </>
          }
          elements={[result.maxDependantNode.name]}
          childFn={(x: string) => <Item property="Source Node" value={x} />}
        />
        <CollapsableItem
          title={
            <>
              <b>Max Dependancy from State:</b> {result.maxDependancyS} nodes
            </>
          }
          elements={[result.maxDependantNodeS.name]}
          childFn={(x: string) => <Item property="Source Node" value={x} />}
        />
      </List>
      {/* <ul>
        <li className="dependancy-details">
          <details>
            <summary>
              <b>Longest Path:</b> {result.longestPathLength} nodes long
            </summary>
            <p>{result.longestPathStart.name}</p>
          </details>
        </li>
        <li className="dependancy-details">
          <details>
            <summary>
              <b>Max Dependancy:</b> {result.maxDependancy} nodes
            </summary>
            <p>{result.maxDependantNode.name}</p>
          </details>
        </li>
        <li className="dependancy-details">
          <details>
            <summary>
              <b>Longest Path from State:</b> {result.longestPathLengthS} nodes
              long
            </summary>
            <p>{result.longestPathStartS.name}</p>
          </details>
        </li>
        <li className="dependancy-details">
          <details>
            <summary>
              <b>Max Dependancy from State:</b> {result.maxDependancyS} nodes
            </summary>
            <p>{result.maxDependantNodeS.name}</p>
          </details>
        </li>
      </ul> */}
    </Widget>
  );
}

export default GlobalInfo;
