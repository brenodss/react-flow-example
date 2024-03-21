import { useState, useCallback, useEffect } from 'react';

import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Panel,
  Background,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { onNodeConnection } from './types/ReactFlowTypes';
import { initialNodes, nodeTypes } from './components/Reactflow/nodes';
import { useSavedAlert } from './hooks/useSavedAlert';
import SavedAlert from './components/SavedAlert';

export const flowKey = 'example-flow';

const getNodeId = () => `randomnode_${+new Date()}`;

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const SaveRestore = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState<any>(null); // onInit method have <any any> parameters types 
  const {showAlert, onSave} = useSavedAlert(rfInstance);
  const { setViewport } = useReactFlow();

  const restoreWorkstation = useCallback(() => {
    const restoreFlow = async () => {
      const flow = localStorage.getItem(flowKey)
      
      if (flow) {
        const jsonFlow = JSON.parse(flow);
        const { x = 0, y = 0, zoom = 1 } = jsonFlow.viewport;
        setNodes(jsonFlow.nodes || []);
        setEdges(jsonFlow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);
  useEffect(() => { restoreWorkstation()}, [])


  const onConnect = useCallback((params: onNodeConnection) => {    
    return setEdges((eds) => addEdge(params, eds))
  }, [setEdges]);

  const addNode = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: 'Added node' },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setRfInstance}
    >
      <Panel className='' position="top-right">
        <div className='flex gap-x-4'>
          <button className='border border-black p-2 rounded-md hover:bg-gray-200' onClick={onSave}>save</button>
          <button className='border border-black p-2 rounded-md hover:bg-gray-200' onClick={restoreWorkstation}>restore</button>
          <button className='border border-black p-2 rounded-md hover:bg-gray-200' onClick={addNode}>add node</button>
        </div>
      </Panel>
      <Background />
      <MiniMap />
      {showAlert && <SavedAlert /> }
    </ReactFlow>
  );
};

export default () => (
  <ReactFlowProvider>
    <SaveRestore />
  </ReactFlowProvider>
);
