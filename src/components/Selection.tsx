import { useState } from "react";
import Model from "../model/Model";
import { ModelNode, NodeType } from "../model/NodeTypes";

function Selection({
  model,
  selected,
  setSelected,
}: {
  model: Model;
  selected: ModelNode;
  setSelected: React.Dispatch<React.SetStateAction<ModelNode>>;
}) {
  const [active, setActive] = useState(1);

  return (
    <details className="selection" open>
      <summary>Selection</summary>
      <TabsItselves active={active} setActive={setActive} />

      <TabContent
        model={model}
        active={active}
        selected={selected}
        setSelected={setSelected}
      />
    </details>
  );
}

function TabsItselves({
  active,
  setActive,
}: {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}) {
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
}: {
  model: Model;
  active: number;
  selected: ModelNode;
  setSelected: React.Dispatch<React.SetStateAction<ModelNode>>;
}) {
  model.dagRoots.sort(sortRoots);
  const bads = model.bads.sort(sortRoots);
  const pcs = model.dagRoots.filter(filterPCs);
  const regs = model.dagRoots.filter(filterRegs);
  const oth = model.dagRoots.filter(filterOther);

  return (
    <div className="content-tabs">
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
          {pcs.map((x) => (
            <li
              className={x === selected ? "selected" : ""}
              key={`${x.nid}`}
              onClick={() => setSelected(x)}>
              {x.parents[0].name}
            </li>
          ))}
        </ul>
      </div>
      <div className={active === 3 ? "content  active-content" : "content"}>
        <ul>
          {regs.map((x) => (
            <li
              className={x === selected ? "selected" : ""}
              key={`${x.nid}`}
              onClick={() => setSelected(x)}>
              {x.parents[0].name}
            </li>
          ))}
        </ul>
      </div>
      <div className={active === 4 ? "content  active-content" : "content"}>
        <ul>
          {oth.map((x) => (
            <li
              className={x === selected ? "selected" : ""}
              key={`${x.nid}`}
              onClick={() => setSelected(x)}>
              {x.parents[0].name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const sortRoots = (a: ModelNode, b: ModelNode) => {
  const aVal = a.type === NodeType.Bad ? a.name! : a.parents[0].name!;
  const bVal = b.type === NodeType.Bad ? b.name! : b.parents[0].name!;
  if (aVal < bVal) return -1;
  if (aVal > bVal) return 1;
  return 0;
};

const filterPCs = (x: ModelNode) => {
  return x.parents[0].name?.startsWith("pc=");
};

const filterRegs = (x: ModelNode) => {
  return x.parents[0].name?.match("^[rfsgta][0-9ap][01]?$");
};

const filterOther = (x: ModelNode) => {
  return !(x.type === NodeType.Bad || filterPCs(x) || filterRegs(x));
};

export default Selection;
