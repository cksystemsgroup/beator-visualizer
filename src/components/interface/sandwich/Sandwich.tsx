import { useState } from "react";
import { SandwichProps, TabsItSelvesProps } from "../../../types/react-types";
import Legend from "./Legend";
import Misc from "./Misc";
import Settings from "./Settings";

function Sandwich(props: SandwichProps) {
  const [active, setActive] = useState(2);

  return (
    <details className="sandwich">
      <summary className="s-summary">☰</summary>
      <TabsItselves active={active} setActive={setActive} />
      <TabContent {...props} active={active} />
    </details>
  );
}

function TabsItselves({ active, setActive }: TabsItSelvesProps) {
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

function TabContent({ active, ...props }: SandwichProps & { active: number }) {
  return (
    <div className="content-tabs">
      <div className={active === 1 ? "content  active-content" : "content"}>
        <Legend />
      </div>
      <div className={active === 2 ? "content  active-content" : "content"}>
        <Settings {...props} />
      </div>
      <div className={active === 3 ? "content  active-content" : "content"}>
        <Misc {...props} />
      </div>
    </div>
  );
}

export default Sandwich;
