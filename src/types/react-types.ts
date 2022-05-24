import { GraphNode } from "./graph-types";
import { Model } from "./model-types";
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

export interface ClumpObject {
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
}

export interface SandwichProps {
  autoExpand: boolean;
  setAutoExpand: SetBoolean;
  setTarget: SetGraphNodeQ;
  clump: ClumpObject;
  showFile: boolean;
  setShowFile: SetBoolean;
  showPath: boolean;
  setShowPath: SetBoolean;
}

export interface TabsItSelvesProps {
  active: number;
  setActive: SetNumber;
}

export interface SelectionProps {
  model: Model;
  selected: ModelNode;
  setSelected: SetModelNode;
}

export interface GraphProps {
  model: Model;
  setTarget: SetGraphNodeQ;
  selected: ModelNode;
  autoExpand: boolean;
  clump: ClumpObject;
  showPath: boolean;
}
