import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import { BaseTriggerNode } from "../../base-trigger-node";
import { MousePointer2Icon } from "lucide-react";

export const ManualNode = memo((props : NodeProps) => {
    return <>
        <BaseTriggerNode 
        {...props}
        name="Click to trigger"
        desciption="Clicking this node will trigger a workflow"
        onSettings={() => {}}
        onDoubleClick={() => {}}
        icon={MousePointer2Icon}
        >
        </BaseTriggerNode>
    </>
})

ManualNode.displayName = "ManualNode"