import { useCallback } from 'react';
import { Viewport } from 'reactflow';
import { SetEdges, SetNodes } from '../types/ReactFlowTypes';

export const onSave = (rfInstance: any, flowKey: string) => {
    return useCallback(() => {
      if (rfInstance) {
        const flow = rfInstance.toObject();
        localStorage.setItem(flowKey, JSON.stringify(flow));
        console.log(rfInstance);
      }
    }, [rfInstance, flowKey]);
  };

  export const onRestore = (setNodes: SetNodes, setViewport: (viewport: Viewport) => void, flowKey: string, setEdges: SetEdges) => {
    return useCallback(() => {
        const restoreFlow = async () => {
            const flow = localStorage.getItem(flowKey);

            if (flow) {
                const jsonFlow = JSON.parse(flow);
                const { x = 0, y = 0, zoom = 1 } = jsonFlow.viewport;
                setNodes(jsonFlow.nodes || []);
                setEdges(jsonFlow.edges || []);
                setViewport({ x, y, zoom });
            }
        };

        restoreFlow();
    }, [setNodes, setViewport, flowKey]);
};