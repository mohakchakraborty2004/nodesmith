import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../../base-trigger-node";
import { MousePointer2Icon } from "lucide-react";
import ManualTriggerDialog from "./TriggerDialog";
import { NodeStatus } from "../../base-trigger-node";

export const ManualNode = memo((props : NodeProps) => {
    const [open , onOpenChange] = useState(false);
    const [status , setStatus] = useState<NodeStatus>(NodeStatus.initial);
    return <>
        <ManualTriggerDialog open={open} onOpenChange={() => onOpenChange(!open)}></ManualTriggerDialog>
        <BaseTriggerNode 
        {...props}
        name="Click to trigger"
        desciption="Clicking this node will trigger a workflow"
        onSettings={() => {
            onOpenChange(true)
        }}
        onDoubleClick={() => {
            onOpenChange(true)
        }}
        icon={MousePointer2Icon}
        status={status}
        >
        </BaseTriggerNode>
    </>
})

ManualNode.displayName = "ManualNode"