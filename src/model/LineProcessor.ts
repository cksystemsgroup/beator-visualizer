import Model from "./Model";
import { ModelNode, NodeType } from "./NodeTypes";

export default function processLine(line: string, model: Model) {
  const createNode = (line: string): [number, ModelNode] => {
    const [nidStr, inst, ...operands] = line.split(" ");
    const nid = parseInt(nidStr);
    const type = determineType(inst);

    if (type === NodeType.Const)
      return [nid, new ModelNode(nid, type, [], parseInt(operands[0]))];

    const node = new ModelNode(
      nid,
      type,
      ...determineParameters(type, operands)
    );

    if (type === NodeType.Next) model.rootsDag.push(node);
    else if (type === NodeType.Bad) {
      model.rootsDag.push(node);
      model.bads.push(node);
    }

    return [nid, node];
  };

  function determineParameters(
    type: NodeType,
    operands: string[]
  ): [ModelNode[], number?, string?] {
    if (type === NodeType.State || type === NodeType.Input) {
      return [
        operands.slice(1, -1).map((x) => model.nodes.get(parseInt(x))!),
        undefined,
        operands.at(-1),
      ];
    } else if (type === NodeType.Bad) {
      return [
        operands.slice(0, -1).map((x) => model.nodes.get(parseInt(x))!),
        undefined,
        operands.at(-1),
      ];
    } else if (type === NodeType.Ext) {
      return [
        operands.slice(1, -1).map((x) => model.nodes.get(parseInt(x))!),
        parseInt(operands.at(-1)!),
      ];
    } else {
      return [operands.slice(1).map((x) => model.nodes.get(parseInt(x))!)];
    }
  }

  if (line.startsWith(";")) return;
  if (line === "") return;

  const entry = createNode(line);
  if (entry[1].type === NodeType.Sort) return;

  if (entry[1].type === NodeType.Init) {
    entry[1].parents[0].parents.push(entry[1].parents[1]);
    return;
  }

  model.nodes.set(...entry);
}

function determineType(type: string) {
  switch (type) {
    case "sort":
      return NodeType.Sort;
    case "constd":
      return NodeType.Const;
    case "read":
      return NodeType.Read;
    case "write":
      return NodeType.Write;
    case "add":
      return NodeType.Add;
    case "sub":
      return NodeType.Sub;
    case "mul":
      return NodeType.Mul;
    case "udiv":
      return NodeType.Div;
    case "urem":
      return NodeType.Rem;
    case "ult":
      return NodeType.Ult;
    case "eq":
      return NodeType.Eq;
    case "and":
      return NodeType.And;
    case "uext":
      return NodeType.Ext;
    case "ite":
      return NodeType.Ite;
    case "not":
      return NodeType.Not;
    case "state":
      return NodeType.State;
    case "init":
      return NodeType.Init;
    case "input":
      return NodeType.Input;
    case "bad":
      return NodeType.Bad;
    case "next":
      return NodeType.Next;
    default:
      throw new Error(`Unknown instruction: ${type}`);
  }
}
