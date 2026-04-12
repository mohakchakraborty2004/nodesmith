"use client"

import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, ControlButton, Controls, MiniMap, Node, Edge, Panel, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useSuspenseWorkflowForId } from '@/hooks/client-suspense';
import { nodeComponents } from '@/lib/nodeconstants';
import { AddButton } from './add-node-button';
 
// const initialNodes = [
//   { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
//   { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
// ];
// const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];
 
export default function Editor({workflowId} : {workflowId : string}) {
  const workflowData = useSuspenseWorkflowForId({id : workflowId})
  const [nodes, setNodes] = useState<Node[]>(workflowData.data.nodes);
  const [edges, setEdges] = useState<Edge[]>(workflowData.data.connections as Edge[]);
 
  const onNodesChange = useCallback(
    (changes : any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes : any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params : any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
 
  return (
    <div style={{ width: '100vw', height: '90vh' ,padding : "10px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeComponents}
        fitView
      >
        <Background />
        <Controls></Controls>
        <MiniMap></MiniMap>
        <Panel position="top-right">
            <AddButton></AddButton>
        </Panel>
      </ReactFlow>
      

    </div>
  );
}