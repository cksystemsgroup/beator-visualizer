import React from "react";
import { ModelNode } from "../model/NodeTypes";

function Settings({
  autoExpand,
  setAutoExpand,
  setTarget,
}: {
  autoExpand: boolean;
  setAutoExpand: React.Dispatch<React.SetStateAction<boolean>>;
  setTarget: React.Dispatch<React.SetStateAction<ModelNode | undefined>>;
}) {
  return (
    <details className="settings">
      <summary>Settings</summary>
      <label>
        <input
          checked={autoExpand}
          type="checkbox"
          onChange={() => {
            setAutoExpand((x) => !x);
            setTarget(undefined);
          }}
        />
        Auto Expand
      </label>
    </details>
  );
}

export default Settings;
