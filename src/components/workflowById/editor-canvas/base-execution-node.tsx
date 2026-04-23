import { NodeProps, Position, useReactFlow } from "@xyflow/react";
import React, { memo, useState } from "react";
import { PlaceholderNode } from "./placeholder-node";
import { GlobeIcon, Icon, type LucideIcon, PlusIcon } from "lucide-react";
import { WorkflowNode } from "./workflowNode";
import { NodeSelector } from "./Nodeselector";
import { BaseNode, BaseNodeContent } from "./base-node";
import { BaseHandle } from "@/components/base-handle";
import { NodeStatus } from "./base-trigger-node";
import { NodeStatusIndicator } from "./NodeStatusIndicator";

interface BaseExecutionNodeProps extends NodeProps{
    icon : LucideIcon
    name : string
    desciption? : string
    children? : string
    status? : NodeStatus
    onSettings? : () => void;
    onDoubleClick : () => void;
}

export const BaseExecutionNode = memo(({
icon : Icon,
name,
desciption,
children,
onSettings,
onDoubleClick,
id, 
status
}: BaseExecutionNodeProps) => {
     const {setNodes , setEdges} = useReactFlow();
        const handleDelete = () => {
            setNodes((currentNodes) => {
                const updatedNodes = currentNodes.filter((node) => node.id !== id);
                return updatedNodes
            })
    
            setEdges((currentEdges) => {
                const updatedEdges = currentEdges.filter((edge)=> {
                    edge.source !== id && edge.target !== id
                })
                return updatedEdges
            })
        }
    return (<>
        <WorkflowNode
         name={name}
         description={desciption}
         onSettings={onSettings}
         onDelete={handleDelete}
         onDoubleClick={onDoubleClick}
        >
            <NodeStatusIndicator status={status}>
            <BaseNode>
                <BaseNodeContent>
                  <Icon className="size-4"></Icon>
                  {children}
                  <BaseHandle 
                  id="target-1"
                  type="target"
                  position={Position.Left}
                  />

                  <BaseHandle 
                  id="source-1"
                  type="source"
                  position={Position.Right}
                  />
                </BaseNodeContent>

            </BaseNode>
            </NodeStatusIndicator>

        </WorkflowNode>
    </>)
})


BaseExecutionNode.displayName = "BaseExecutionName"
