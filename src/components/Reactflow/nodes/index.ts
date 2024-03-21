import type { Node, NodeTypes } from "reactflow";
import { PositionLoggerNode } from "./PositionLoggerNode";
import { MyCustomNode } from "./MyCustomNode";

export const initialNodes = [
  { id: "a", type: "input", position: { x: 0, y: 0 }, data: { label: "wire" } },
  {
    id: "b",
    type: "position-logger",
    position: { x: -100, y: 100 },
    data: { label: "drag me!" },
  },
  { id: "c", position: { x: 100, y: 100 }, data: { label: "your ideas" } },
  {
    id: "d",
    type: "output",
    position: { x: 200, y: 0 },
    data: { label: "with React Flow" },
  },
  {
    id: "e",
    type: "my-custom-node",
    position: { x: 0, y: 400 },
    data: { label: "custom node" },
  },
] satisfies Node[];

export const nodeTypes = { // First add node types here, and on initial nodes you have to specify what custom node
  "position-logger": PositionLoggerNode,
  "my-custom-node": MyCustomNode
  // Add any of your custom nodes here!
} satisfies NodeTypes;
