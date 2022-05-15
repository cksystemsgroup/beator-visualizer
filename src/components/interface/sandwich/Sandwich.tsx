import { useState } from "react";
import {
  ClumpObject,
  SetBoolean,
  SetGraphNodeQ,
  SetNumber,
} from "../../../types/react-types";
import Legend from "./Legend";
import Settings from "./Settings";

function Sandwich(props: {
  autoExpand: boolean;
  setAutoExpand: SetBoolean;
  setTarget: SetGraphNodeQ;
  clump: ClumpObject;
}) {
  const [active, setActive] = useState(2);

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
  setActive: SetNumber;
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
  ...props
}: {
  active: number;
  autoExpand: boolean;
  setAutoExpand: SetBoolean;
  setTarget: SetGraphNodeQ;
  clump: ClumpObject;
}) {
  return (
    <div className="content-tabs">
      <div className={active === 1 ? "content  active-content" : "content"}>
        <Legend />
      </div>
      <div className={active === 2 ? "content  active-content" : "content"}>
        <Settings {...props} />
      </div>
      <div className={active === 3 ? "content  active-content" : "content"}>
        <p>Nothing here yet!</p>
      </div>
    </div>
  );
}

export default Sandwich;
