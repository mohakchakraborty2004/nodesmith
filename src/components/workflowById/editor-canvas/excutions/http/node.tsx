import { Node, NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../../base-execution-node";
import { GlobeIcon } from "lucide-react";
import HttpDialog from "./executionConfigDialog";

type HttpRequestNodeData = {
    endpoint? : string;
    method? : "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body? : string;
    [key : string] : unknown;
}

type httpRequestNodeProps = Node<HttpRequestNodeData>

export const HttpNode = memo((props : NodeProps<httpRequestNodeProps>) => {
    
    const [open , setOpen] = useState(false);

    const nodeData = props.data
    const description = nodeData?.endpoint ? `${nodeData.method || "GET"} : ${nodeData.endpoint}` : "Not configured"

    const handleOpenSettings = () => {
        setOpen(true)
    }

    return (
        <>
          <HttpDialog
            open={open}
            onOpenChange={() => setOpen(!open)}
            >
         </HttpDialog>

          
            <BaseExecutionNode
            {...props}
            icon={GlobeIcon}
            name="Http Request"
            desciption={description}
            onSettings={() => {
                handleOpenSettings()
            }}
            onDoubleClick={() => {
                handleOpenSettings()
            }}
            >
                
            </BaseExecutionNode>

            
        </>
    )
})

HttpNode.displayName = "HttpNode"
