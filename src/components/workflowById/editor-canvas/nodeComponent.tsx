"use client"

import { NodeProps } from "@xyflow/react";
import React, { memo, useState } from "react";
import { PlaceholderNode } from "./placeholder-node";
import { PlusIcon } from "lucide-react";
import { WorkflowNode } from "./workflowNode";
import { NodeSelector } from "./Nodeselector";

export const InitialNode = memo((props : NodeProps) => {
    const [selector , setSelector] = useState(false)
    return (
        <WorkflowNode>
        <NodeSelector onOpenChange={setSelector} open={selector}>
        <PlaceholderNode
        onClick={() => {
            setSelector(true)
        }}
        >
            <div className="flex justify-center items-center cursor-pointer">
                <PlusIcon className="size-4"></PlusIcon>
            </div>
        </PlaceholderNode>
        </NodeSelector>
        </WorkflowNode>
    )
})

InitialNode.displayName = "InitialNode"