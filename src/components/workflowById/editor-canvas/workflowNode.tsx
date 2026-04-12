"use client";

import { Button } from "@/components/ui/button";
import { NodeToolbar, Position } from "@xyflow/react";
import { SettingsIcon, TrashIcon } from "lucide-react";


interface workflowNodeProps {
    children : React.ReactNode,
    showToolbar? : boolean,
    onDelete? : () => void;
    onSettings? : () => void;
    name? : string;
    description? : string;
}


export function WorkflowNode({
    children,
    showToolbar = true,
    onDelete,
    onSettings,
    name,
    description
}: workflowNodeProps) {

    return ( 
        <>
            {showToolbar && (
                <div>
                    <NodeToolbar>
                        <Button className="size-sm m-3" onClick={onSettings}>
                            <SettingsIcon className="size-4"></SettingsIcon>
                        </Button>
                        <Button className="size-sm" onClick={onDelete}>
                            <TrashIcon className="size-4"></TrashIcon>
                        </Button>
                    </NodeToolbar>
                    
                </div>
            )}
            {children}
            {name && (
                <div>
                    <NodeToolbar
                    isVisible
                    position={Position.Bottom}
                    className="max-w-50"
                    >
                        <p className="text-sm font-bold">
                            {name}
                        </p>
                        {description && (
                            <div className="text-xs">
                                {description}
                            </div>
                        )}
                    </NodeToolbar>
                </div>
            )}
        </>
    )
}