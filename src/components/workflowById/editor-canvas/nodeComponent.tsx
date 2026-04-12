"use client"

import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import { PlaceholderNode } from "./placeholder-node";
import { PlusIcon } from "lucide-react";
import { WorkflowNode } from "./workflowNode";

export const InitialNode = memo((props : NodeProps) => {
    return (
        <WorkflowNode  name="node" description="node description">
        <PlaceholderNode
        onClick={() => {

        }}
        >
            <div className="flex justify-center items-center cursor-pointer">
                <PlusIcon className="size-4"></PlusIcon>
            </div>
        </PlaceholderNode>
        </WorkflowNode>
    )
})

InitialNode.displayName = "InitialNode"