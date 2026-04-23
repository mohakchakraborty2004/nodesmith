import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../../base-trigger-node";
import { FormIcon } from "lucide-react";
import GoogleTriggerDialog from "./TriggerDIalog";
import { NodeStatus } from "../../base-trigger-node";

export const GoogleNode = memo((props : NodeProps) => {
    const [open , onOpenChange] = useState(false);
    const [status , setStatus] = useState<NodeStatus>(NodeStatus.initial);
    return <>
        <GoogleTriggerDialog open={open} onOpenChange={() => onOpenChange(!open)}></GoogleTriggerDialog>
        <BaseTriggerNode 
        {...props}
        name="Google form trigger"
        desciption="Whenever the google form is submitted, the workflow will be triggered"
        onSettings={() => {
            onOpenChange(true)
        }}
        onDoubleClick={() => {
            onOpenChange(true)
        }}
        icon={FormIcon}
        status={status}
        >
        </BaseTriggerNode>
    </>
})

GoogleNode.displayName = "GoogleNode"