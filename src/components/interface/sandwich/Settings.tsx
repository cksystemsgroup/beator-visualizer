import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ClumpObject, SandwichProps } from "../../../types/react-types";

function Settings({
  autoExpand,
  setAutoExpand,
  setTarget,
  clump,
  showPath,
  setShowPath,
}: SandwichProps) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            disabled={anyClumpActive(clump)}
            checked={autoExpand}
            onChange={() => {
              setAutoExpand((x) => !x);
              setTarget(undefined);
            }}
          />
        }
        label="Auto Expand"
      />
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            disabled={showPath}
            checked={Object.values(clump)
              .filter((x) => typeof x == "boolean")
              .reduce((a, x) => a && x, true)}
            onChange={() => {
              const b = !Object.values(clump).reduce((a, x) => a && x);
              Object.values(clump)
                .filter((x) => !(typeof x === "boolean"))
                .forEach((x) => x(b));
            }}
          />
        }
        label="All"
      />
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            disabled={showPath}
            checked={clump.clumpIf}
            onChange={() => clump.setClumpIf((x) => !x)}
          />
        }
        label="IfThenElse"
      />
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            disabled={showPath}
            checked={clump.clumpLogic}
            onChange={() => clump.setClumpLogic((x) => !x)}
          />
        }
        label="Logic"
      />
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            disabled={showPath}
            checked={clump.clumpConst}
            onChange={() => clump.setClumpConst((x) => !x)}
          />
        }
        label="Constant"
      />
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            disabled={showPath}
            checked={clump.clumpState}
            onChange={() => clump.setClumpState((x) => !x)}
          />
        }
        label="State"
      />
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            disabled={showPath}
            checked={clump.clumpWrite}
            onChange={() => clump.setClumpWrite((x) => !x)}
          />
        }
        label="Write"
      />
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            disabled={showPath}
            checked={clump.clumpArith}
            onChange={() => clump.setClumpArith((x) => !x)}
          />
        }
        label="Arithmetic"
      />
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            disabled={showPath}
            checked={clump.clumpInput}
            onChange={() => clump.setClumpInput((x) => !x)}
          />
        }
        label="Input"
      />
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            checked={showPath}
            onChange={() => {
              if (!showPath) {
                clump.setClumpIf(false);
                clump.setClumpArith(false);
                clump.setClumpConst(false);
                clump.setClumpLogic(false);
                clump.setClumpWrite(false);
                clump.setClumpState(false);
                clump.setClumpInput(false);
              }
              setShowPath((x) => !x);
            }}
          />
        }
        label="Show Longest Path in Current Selection"
      />
    </FormGroup>
    //     <br />
    //     <label>
    //       <input
    //         disabled={showPath}
    //         type="checkbox"
    //         checked={clump.clumpConst}
    //         onChange={() => clump.setClumpConst((x) => !x)}
    //       />
    //       Constant
    //     </label>
    //     <br />
    //     <label>
    //       <input
    //         disabled={showPath}
    //         type="checkbox"
    //         checked={clump.clumpState}
    //         onChange={() => clump.setClumpState((x) => !x)}
    //       />
    //       State
    //     </label>
    //     <br />
    //     <label>
    //       <input
    //         disabled={showPath}
    //         type="checkbox"
    //         checked={clump.clumpWrite}
    //         onChange={() => clump.setClumpWrite((x) => !x)}
    //       />
    //       Write
    //     </label>
    //     <br />
    //     <label>
    //       <input
    //         disabled={showPath}
    //         type="checkbox"
    //         checked={clump.clumpArith}
    //         onChange={() => clump.setClumpArith((x) => !x)}
    //       />
    //       Arithmetic
    //     </label>{" "}
    //     <br />
    //     <label>
    //       <input
    //         disabled={showPath}
    //         type="checkbox"
    //         checked={clump.clumpInput}
    //         onChange={() => clump.setClumpInput((x) => !x)}
    //       />
    //       Input
    //     </label>
    //   </details>
  );
}

function anyClumpActive(clump: ClumpObject): boolean {
  for (const c of Object.values(clump)) {
    if (!(c instanceof Object) && c) return true;
  }

  return false;
}

export default Settings;
