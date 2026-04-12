import { NodeProps, Position } from "@xyflow/react";
import React, { memo, useState } from "react";
import { PlaceholderNode } from "./placeholder-node";
import { GlobeIcon, Icon, type LucideIcon, PlusIcon } from "lucide-react";
import { WorkflowNode } from "./workflowNode";
import { NodeSelector } from "./Nodeselector";
import { BaseNode, BaseNodeContent } from "./base-node";
import { BaseHandle } from "@/components/base-handle";

interface BaseTriggerNodeProps extends NodeProps{
    icon : LucideIcon
    name : string
    desciption? : string
    children? : string
    // status? : NodeStatus
    onSettings? : () => void;
    onDoubleClick : () => void;
}

export const BaseTriggerNode = memo(({
icon : Icon,
name,
desciption,
children,
onSettings,
onDoubleClick
}: BaseTriggerNodeProps) => {
    const handleDelete = () => {

    }
    return (<>
        <WorkflowNode
         name={name}
         description={desciption}
         onSettings={onSettings}
         onDelete={handleDelete}
        >
            <BaseNode>
                <BaseNodeContent>
                  <Icon className="size-4"></Icon>
                  {children}

                  <BaseHandle 
                  id="source-1"
                  type="source"
                  position={Position.Right}
                  />
                </BaseNodeContent>

            </BaseNode>

        </WorkflowNode>
    </>)
})


BaseTriggerNode.displayName = "BaseTriggerName"
