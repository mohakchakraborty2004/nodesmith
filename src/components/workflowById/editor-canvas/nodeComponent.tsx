"use client"

import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import { PlaceholderNode } from "./placeholder-node";
import { PlusIcon } from "lucide-react";

export const InitialNode = memo((props : NodeProps) => {
    return (
        <PlaceholderNode>
            <div className="flex justify-center items-center cursor-pointer">
                <PlusIcon className="size-4"></PlusIcon>
            </div>
        </PlaceholderNode>
    )
})

InitialNode.displayName = "InitialNode"