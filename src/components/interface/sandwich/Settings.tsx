import { Checkbox, FormControlLabel, FormGroup, List } from "@mui/material";
import { ClumpObject, SandwichProps } from "../../../types/react-types";
import { CollapsableItem } from "../../general/ListUtils";

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
        sx={{ pt: "10px" }}
        control={
          <Checkbox
            sx={{ p: 0, pl: "10px" }}
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
      <List disablePadding>
        <CollapsableItem
          title="Clumping"
          elements={[
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ p: 0, pl: "10px" }}
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
            />,
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ p: 0, pl: "10px" }}
                  disableRipple
                  disabled={showPath}
                  checked={clump.clumpIf}
                  onChange={() => clump.setClumpIf((x) => !x)}
                />
              }
              label="IfThenElse"
            />,
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ p: 0, pl: "10px" }}
                  disableRipple
                  disabled={showPath}
                  checked={clump.clumpLogic}
                  onChange={() => clump.setClumpLogic((x) => !x)}
                />
              }
              label="Logic"
            />,
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ p: 0, pl: "10px" }}
                  disableRipple
                  disabled={showPath}
                  checked={clump.clumpConst}
                  onChange={() => clump.setClumpConst((x) => !x)}
                />
              }
              label="Constant"
            />,
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ p: 0, pl: "10px" }}
                  disableRipple
                  disabled={showPath}
                  checked={clump.clumpState}
                  onChange={() => clump.setClumpState((x) => !x)}
                />
              }
              label="State"
            />,
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ p: 0, pl: "10px" }}
                  disableRipple
                  disabled={showPath}
                  checked={clump.clumpWrite}
                  onChange={() => clump.setClumpWrite((x) => !x)}
                />
              }
              label="Write"
            />,
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ p: 0, pl: "10px" }}
                  disableRipple
                  disabled={showPath}
                  checked={clump.clumpArith}
                  onChange={() => clump.setClumpArith((x) => !x)}
                />
              }
              label="Arithmetic"
            />,
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ p: 0, pl: "10px" }}
                  disableRipple
                  disabled={showPath}
                  checked={clump.clumpInput}
                  onChange={() => clump.setClumpInput((x) => !x)}
                />
              }
              label="Input"
            />,
          ]}
          childFn={(x: any, i: number) => (
            <span key={i}>
              {x} <br />
            </span>
          )}
        />{" "}
      </List>
      <FormControlLabel
        control={
          <Checkbox
            sx={{ p: 0, pl: "10px" }}
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
  );
}

function anyClumpActive(clump: ClumpObject): boolean {
  for (const c of Object.values(clump)) {
    if (!(c instanceof Object) && c) return true;
  }

  return false;
}

export default Settings;
