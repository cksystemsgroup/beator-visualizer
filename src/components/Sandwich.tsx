import React, { useState } from "react";
import { ModelNode } from "../model/NodeTypes";
import { ClumpObject } from "../view/d3/types";

function Sandwich(props: {
  autoExpand: boolean;
  setAutoExpand: React.Dispatch<React.SetStateAction<boolean>>;
  setTarget: React.Dispatch<React.SetStateAction<ModelNode | undefined>>;
  clump: ClumpObject;
}) {
  const [active, setActive] = useState(1);

  return (
    <details className="sandwich">
      <summary className="s-summary">☰</summary>
      <TabsItselves active={active} setActive={setActive} />

      <TabContent {...props} active={active} />
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
        Legend
      </button>
      <button
        className={active === 2 ? "tabs active-tabs" : "tabs"}
        onClick={() => setActive(2)}>
        Settings
      </button>
      <button
        className={active === 3 ? "tabs active-tabs" : "tabs"}
        onClick={() => setActive(3)}>
        Misc.
      </button>
    </div>
  );
}

function TabContent({
  active,
  autoExpand,
  setAutoExpand,
  setTarget,
  clump,
}: {
  active: number;
  autoExpand: boolean;
  setAutoExpand: React.Dispatch<React.SetStateAction<boolean>>;
  setTarget: React.Dispatch<React.SetStateAction<ModelNode | undefined>>;
  clump: ClumpObject;
}) {
  return (
    <div className="content-tabs">
      <div className={active === 1 ? "content  active-content" : "content"}>
        <ul className="legend">
          <li className="Bad">Bad, Next</li>
          <li className="Constant">Constant, Input</li>
          <li className="State">State</li>
          <li className="And">And, Not, Equals, Less-than</li>
          <li className="If-then-else">If-then-else</li>
          <li className="Addition">
            Addition, Subtraction, Division, Multiplication, Remainder, Extend
          </li>
          <li className="Read">Read</li>
          <li className="Write">Write</li>
        </ul>
        <svg width="30" height="10" xmlns="http://www.w3.org/2000/svg">
          <line y2="5" x2="29" y1="5" x1="1" />
        </svg>{" "}
        Boolean <br />
        <svg width="30" height="10" xmlns="http://www.w3.org/2000/svg">
          <line y2="5" x2="29" y1="5" x1="1" strokeWidth="1.5" />
        </svg>{" "}
        1 to 7 Bytes <br />
        <svg width="30" height="10" xmlns="http://www.w3.org/2000/svg">
          <line y2="5" x2="29" y1="5" x1="1" strokeWidth="2" />
        </svg>{" "}
        Machine Word <br />
        <svg width="30" height="10" xmlns="http://www.w3.org/2000/svg">
          <line y2="5" x2="29" y1="5" x1="1" strokeWidth="5" />
        </svg>{" "}
        Virtual Memory <br />
      </div>
      <div className={active === 2 ? "content  active-content" : "content"}>
        <form>
          <label>
            <input
              disabled={anyClumpActive(clump)}
              checked={autoExpand}
              type="checkbox"
              onChange={() => {
                setAutoExpand((x) => !x);
                setTarget(undefined);
              }}
            />
            Auto Expand
          </label>
          <details className="clumping-summary">
            <summary>Clumping (disables collapsing)</summary>
            <label>
              <input
                type="checkbox"
                checked={clump.clumpIf}
                onChange={() => clump.setClumpIf((x) => !x)}
              />
              If-then-else
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={clump.clumpLogic}
                onChange={() => clump.setClumpLogic((x) => !x)}
              />
              Logic
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={clump.clumpConst}
                onChange={() => clump.setClumpConst((x) => !x)}
              />
              Constant
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={clump.clumpState}
                onChange={() => clump.setClumpState((x) => !x)}
              />
              State
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={clump.clumpWrite}
                onChange={() => clump.setClumpWrite((x) => !x)}
              />
              Write
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={clump.clumpArith}
                onChange={() => clump.setClumpArith((x) => !x)}
              />
              Arithmetic
            </label>
          </details>
        </form>
      </div>
      <div className={active === 3 ? "content  active-content" : "content"}>
        <p>Nothing here yet!</p>
      </div>
    </div>
  );
}

function anyClumpActive(clump: ClumpObject): boolean {
  for (const c of Object.values(clump)) {
    if (!(c instanceof Object) && c) return true;
  }

  return false;
}

export default Sandwich;
