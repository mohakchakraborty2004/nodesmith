"use client"

import { useState, useCallback, useMemo } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, ControlButton, Controls, MiniMap, Node, Edge, Panel, Position, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useSuspenseWorkflowForId } from '@/hooks/client-suspense';
import { nodeComponents } from '@/lib/nodeconstants';
import { AddButton } from './add-node-button';
import { UpdateButton } from './updateWorkflowButton';
import { useAtom, useSetAtom } from 'jotai';
import { editorAtom } from '@/lib/atom';
import { NodeType } from '@/generated/prisma/enums';
import { ExecuteButton } from './execute-button';
 
 
export default function Editor({workflowId} : {workflowId : string}) {
  const workflowData = useSuspenseWorkflowForId({id : workflowId})
  const [nodes, setNodes] = useState<Node[]>(workflowData.data.nodes);
  const [edges, setEdges] = useState<Edge[]>(workflowData.data.connections as Edge[]);

const hasManualTrigger = useMemo(() => {
    return nodes.some(node => node.type === NodeType.MANUAL_TRIGGER)
} , [nodes])

  const setEditor = useSetAtom(editorAtom)
 
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
        onInit={setEditor}
        fitView
      >
        <Background />
        <Controls></Controls>
        <MiniMap></MiniMap>
        <Panel position="top-right">
            <AddButton></AddButton>
        </Panel>
        <Panel position='top-left'>
           <UpdateButton id={workflowId} ></UpdateButton>
        </Panel>
        {hasManualTrigger && (
          <Panel position='bottom-center'>
            <ExecuteButton workflowId={workflowId}></ExecuteButton>
          </Panel>
        )}
      </ReactFlow>
      

    </div>
  );
}