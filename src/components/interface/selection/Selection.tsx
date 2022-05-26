import { useState } from "react";
import { ModelNode, NodeType } from "../../../types/node-types";
import { SelectionProps, TabsItSelvesProps } from "../../../types/react-types";
import Widget from "../../general/Widget";

function Selection(props: SelectionProps) {
  const [active, setActive] = useState(1);

  return (
    <Widget title="Selection" expanded sx={{ top: "10px", right: "10px" }}>
      <TabsItselves active={active} setActive={setActive} />
      <TabContent active={active} {...props} />
    </Widget>
  );
}

function TabsItselves({ active, setActive }: TabsItSelvesProps) {
  return (
    <div className="bloc-tabs">
      <button
        className={active === 1 ? "tabs active-tabs" : "tabs"}
        onClick={() => setActive(1)}>
        Bads
      </button>
      <button
        className={active === 2 ? "tabs active-tabs" : "tabs"}
        onClick={() => setActive(2)}>
        PCs
      </button>
      <button
        className={active === 3 ? "tabs active-tabs" : "tabs"}
        onClick={() => setActive(3)}>
        Regs
      </button>
      <button
        className={active === 4 ? "tabs active-tabs" : "tabs"}
        onClick={() => setActive(4)}>
        Other
      </button>
    </div>
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
    <div className="content-tabs">
      {active !== 1 && (
        <label>
          <input
            type="checkbox"
            checked={nextOrState}
            onChange={() => setNextOrState((x) => !x)}
          />{" "}
          {nextOrState ? "State" : "Next"}
        </label>
      )}
      <div className={active === 1 ? "content  active-content" : "content"}>
        <ul>
          {bads.map((x) => (
            <li
              className={x === selected ? "selected" : ""}
              key={`${x.nid}`}
              onClick={() => setSelected(x)}>
              {x.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={active === 2 ? "content  active-content" : "content"}>
        <ul>
          {!nextOrState
            ? pcsNext.map((x) => (
                <li
                  className={x === selected ? "selected" : ""}
                  key={`${x.nid}`}
                  onClick={() => setSelected(x)}>
                  {x.parents[0].name}
                </li>
              ))
            : pcsState.map((x) => (
                <li
                  className={x === selected ? "selected" : ""}
                  key={`${x.nid}`}
                  onClick={() => setSelected(x)}>
                  {x.name}
                </li>
              ))}
        </ul>
      </div>
      <div className={active === 3 ? "content  active-content" : "content"}>
        <ul>
          {!nextOrState
            ? regsNext.map((x) => (
                <li
                  className={x === selected ? "selected" : ""}
                  key={`${x.nid}`}
                  onClick={() => setSelected(x)}>
                  {x.parents[0].name}
                </li>
              ))
            : regsState.map((x) => (
                <li
                  className={x === selected ? "selected" : ""}
                  key={`${x.nid}`}
                  onClick={() => setSelected(x)}>
                  {x.name}
                </li>
              ))}
        </ul>
      </div>
      <div className={active === 4 ? "content  active-content" : "content"}>
        <ul>
          {!nextOrState
            ? othNext.map((x) => (
                <li
                  className={x === selected ? "selected" : ""}
                  key={`${x.nid}`}
                  onClick={() => setSelected(x)}>
                  {x.parents[0].name}
                </li>
              ))
            : othState.map((x) => (
                <li
                  className={x === selected ? "selected" : ""}
                  key={`${x.nid}`}
                  onClick={() => setSelected(x)}>
                  {x.name}
                </li>
              ))}
        </ul>
      </div>
    </div>
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
