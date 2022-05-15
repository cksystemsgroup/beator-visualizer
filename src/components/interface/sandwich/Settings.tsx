import {
  ClumpObject,
  SetBoolean,
  SetGraphNodeQ,
} from "../../../types/react-types";

function Settings({
  autoExpand,
  setAutoExpand,
  setTarget,
  clump,
}: {
  autoExpand: boolean;
  setAutoExpand: SetBoolean;
  setTarget: SetGraphNodeQ;
  clump: ClumpObject;
}) {
  return (
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
      <details className="clumping-summary" open>
        <summary>Clumping (disables collapsing)</summary>
        <label>
          <input
            type="checkbox"
            checked={
              clump.clumpIf &&
              clump.clumpArith &&
              clump.clumpConst &&
              clump.clumpLogic &&
              clump.clumpWrite &&
              clump.clumpState &&
              clump.clumpInput
            }
            onChange={() => {
              const b = !(
                clump.clumpIf &&
                clump.clumpArith &&
                clump.clumpConst &&
                clump.clumpLogic &&
                clump.clumpWrite &&
                clump.clumpState &&
                clump.clumpInput
              );
              clump.setClumpIf(b);
              clump.setClumpArith(b);
              clump.setClumpConst(b);
              clump.setClumpLogic(b);
              clump.setClumpWrite(b);
              clump.setClumpState(b);
              clump.setClumpInput(b);
            }}
          />
          All
        </label>
        <br />
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
        </label>{" "}
        <br />
        <label>
          <input
            type="checkbox"
            checked={clump.clumpInput}
            onChange={() => clump.setClumpInput((x) => !x)}
          />
          Input
        </label>
      </details>
    </form>
  );
}

function anyClumpActive(clump: ClumpObject): boolean {
  for (const c of Object.values(clump)) {
    if (!(c instanceof Object) && c) return true;
  }

  return false;
}

export default Settings;
