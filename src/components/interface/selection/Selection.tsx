import { Box, FormControlLabel, Switch, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { ModelNode, NodeType } from "../../../types/node-types";
import { SelectionProps } from "../../../types/react-types";
import { ItemButton, MyList } from "../../general/ListUtils";
import { TabPanel } from "../../general/TabUtils";
import Widget from "../../general/Widget";

function Selection(props: SelectionProps) {
  const [active, setActive] = useState(0);

  return (
    <Widget title="Selection" expanded sx={{ top: "10px", right: "10px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={active} onChange={(_, newValue) => setActive(newValue)}>
          <Tab label="Bads" disableRipple />
          <Tab label="PCs" disableRipple />
          <Tab label="Regs" disableRipple />
          <Tab label="Other" disableRipple />
        </Tabs>
      </Box>
      <TabContent {...props} active={active} />
    </Widget>
  );
}

function TabContent({
  model,
  active,
  selected,
  setSelected,
}: { active: number } & SelectionProps) {
  model.roots.sort(sortRoots);
  model.states.sort(sortStates);

  const [nextOrState, setNextOrState] = useState(false);

  const pcsState = model.states.filter(filterPCsS);
  const regsState = model.states.filter(filterRegsS);
  const othState = model.states.filter(filterOtherS);

  const bads = model.roots.filter(filterBads);
  const pcsNext = model.roots.filter(filterPCs);
  const regsNext = model.roots.filter(filterRegs);
  const othNext = model.roots.filter(filterOther);

  return (
    <>
      {active !== 0 && (
        <FormControlLabel
          control={
            <Switch
              checked={nextOrState}
              onChange={() => setNextOrState((x) => !x)}
              color="default"
            />
          }
          label={nextOrState ? "State" : "Next"}
        />
      )}
      <TabPanel value={active} index={0}>
        <MyList>
          {bads.map((x) => (
            <ItemButton
              key={x.nid}
              itemName={x.name}
              selected={x === selected}
              onClick={() => setSelected(x)}
            />
          ))}
        </MyList>
      </TabPanel>
      <TabPanel value={!nextOrState ? active : -1} index={1}>
        <MyList>
          {pcsNext.map((x) => (
            <ItemButton
              key={x.nid}
              itemName={x.name}
              selected={x === selected}
              onClick={() => setSelected(x)}
            />
          ))}
        </MyList>
      </TabPanel>
      <TabPanel value={!nextOrState ? active : -1} index={2}>
        <MyList>
          {regsNext.map((x) => (
            <ItemButton
              key={x.nid}
              itemName={x.name}
              selected={x === selected}
              onClick={() => setSelected(x)}
            />
          ))}
        </MyList>
      </TabPanel>
      <TabPanel value={!nextOrState ? active : -1} index={3}>
        <MyList>
          {othNext.map((x) => (
            <ItemButton
              key={x.nid}
              itemName={x.name}
              selected={x === selected}
              onClick={() => setSelected(x)}
            />
          ))}
        </MyList>
      </TabPanel>
      <TabPanel value={nextOrState ? active : -1} index={1}>
        <MyList>
          {pcsState.map((x) => (
            <ItemButton
              key={x.nid}
              itemName={x.name}
              selected={x === selected}
              onClick={() => setSelected(x)}
            />
          ))}
        </MyList>
      </TabPanel>
      <TabPanel value={nextOrState ? active : -1} index={2}>
        <MyList>
          {regsState.map((x) => (
            <ItemButton
              key={x.nid}
              itemName={x.name}
              selected={x === selected}
              onClick={() => setSelected(x)}
            />
          ))}
        </MyList>
      </TabPanel>
      <TabPanel value={nextOrState ? active : -1} index={3}>
        <MyList>
          {othState.map((x) => (
            <ItemButton
              key={x.nid}
              itemName={x.name}
              selected={x === selected}
              onClick={() => setSelected(x)}
            />
          ))}
        </MyList>
      </TabPanel>
    </>
  );
}

const sortRoots = (a: ModelNode, b: ModelNode) => {
  const aVal = a.nodeClass === NodeType.Bad ? a.name! : a.parents[0].name!;
  const bVal = b.nodeClass === NodeType.Bad ? b.name! : b.parents[0].name!;
  if (aVal < bVal) return -1;
  if (aVal > bVal) return 1;
  return 0;
};

const sortStates = (a: ModelNode, b: ModelNode) => {
  const aVal = a.name!;
  const bVal = b.name!;
  if (aVal < bVal) return -1;
  if (aVal > bVal) return 1;
  return 0;
};

const filterBads = (x: ModelNode) => x.nodeClass === NodeType.Bad;
const filterPCs = (x: ModelNode) => x.parents[0].name?.startsWith("pc=");
const filterRegs = (x: ModelNode) =>
  x.parents[0].name?.match("^[rfsgta][0-9ap][01]?$");
const filterOther = (x: ModelNode) =>
  !(x.nodeClass === NodeType.Bad || filterPCs(x) || filterRegs(x));

const filterPCsS = (x: ModelNode) => x.name!.startsWith("pc=");
const filterRegsS = (x: ModelNode) => x.name!.match("^[rfsgta][0-9ap][01]?$");
const filterOtherS = (x: ModelNode) => !(filterPCsS(x) || filterRegsS(x));

export default Selection;
