import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";

export type CustomNodeData = {
  label?: string;
};

export function MyCustomNode({
  data
}: NodeProps<CustomNodeData>) {

  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="react-flow__node-default">
      <p>{data.label} AAAAAAAAA</p>
			<img className="h-full w-full m-auto" src="https://www.patterns.dev/img/reactjs/react-logo@3x.svg"></img>
      <Handle type="source" position={Position.Bottom} /> {/* Connections points in the node with type source or output*/}
			<input className="w-1/2 border border-black mt-2"></input>
    </div>
  );
}
