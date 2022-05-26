import { Metrics } from "../../../types/model-types";
import { CollapsableItem, Item, MyList } from "../../general/ListUtils";
import Widget from "../../general/Widget";

function GlobalInfo({ result }: { result: Metrics }) {
  return (
    <Widget
      title="Global Information"
      expanded
      sx={{ bottom: "10px", left: "10px" }}>
      <MyList>
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
          childFn={(x: string) => (
            <Item property="Source Node" value={x} key={x} />
          )}
          closed
        />
        <CollapsableItem
          title={
            <>
              <b>Longest Path from State:</b> {result.longestPathLengthS} nodes
              long
            </>
          }
          elements={[result.longestPathStartS.name]}
          childFn={(x: string) => (
            <Item property="Source Node" value={x} key={x} />
          )}
          closed
        />
        <CollapsableItem
          title={
            <>
              <b>Max Dependancy:</b> {result.maxDependancy} nodes
            </>
          }
          elements={[result.maxDependantNode.name]}
          childFn={(x: string) => (
            <Item property="Source Node" value={x} key={x} />
          )}
          closed
        />
        <CollapsableItem
          title={
            <>
              <b>Max Dependancy from State:</b> {result.maxDependancyS} nodes
            </>
          }
          elements={[result.maxDependantNodeS.name]}
          childFn={(x: string) => (
            <Item property="Source Node" value={x} key={x} />
          )}
          closed
        />
      </MyList>
    </Widget>
  );
}

export default GlobalInfo;
