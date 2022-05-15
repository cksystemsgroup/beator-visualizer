import { GraphNode } from "./graph-types";
import { ModelNode } from "./node-types";

export type SetBoolean = React.Dispatch<React.SetStateAction<boolean>>;
export type SetStringQ = React.Dispatch<
  React.SetStateAction<string | undefined>
>;

export type SetGraphNodeQ = React.Dispatch<
  React.SetStateAction<GraphNode | undefined>
>;

export type SetNumber = React.Dispatch<React.SetStateAction<number>>;
export type SetModelNode = React.Dispatch<React.SetStateAction<ModelNode>>;

export type ClumpObject = {
  clumpIf: boolean;
  setClumpIf: SetBoolean;
  clumpLogic: boolean;
  setClumpLogic: SetBoolean;
  clumpConst: boolean;
  setClumpConst: SetBoolean;
  clumpState: boolean;
  setClumpState: SetBoolean;
  clumpWrite: boolean;
  setClumpWrite: SetBoolean;
  clumpArith: boolean;
  setClumpArith: SetBoolean;
  clumpInput: boolean;
  setClumpInput: SetBoolean;
};
