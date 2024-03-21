import { Edge, Node } from "reactflow";

export type onNodeConnection = {
    source: string | null;
    target: string | null;
    sourceHandle: string | null;
    targetHandle: string | null;
  };

// React setStates
export type SetNodes = React.Dispatch<React.SetStateAction<Node<{ label: string; }, string | undefined>[]>>;
export type SetEdges = React.Dispatch<React.SetStateAction<Edge<any>[]>>