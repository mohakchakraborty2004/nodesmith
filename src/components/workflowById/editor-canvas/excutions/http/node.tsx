import { Node, NodeProps } from "@xyflow/react";
import { memo } from "react";
import { BaseExecutionNode } from "../../base-execution-node";
import { GlobeIcon } from "lucide-react";

type HttpRequestNodeData = {
    endpoint? : string;
    method? : "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body? : string;
    [key : string] : unknown;
}

type httpRequestNodeProps = Node<HttpRequestNodeData>

export const HttpNode = memo((props : NodeProps<httpRequestNodeProps>) => {
    
    const nodeData = props.data as HttpRequestNodeData
    const description = nodeData?.endpoint ? `${nodeData.method || "GET"} : ${nodeData.endpoint}` : "Not configured"

    return (
        <>
            <BaseExecutionNode
            {...props}
            icon={GlobeIcon}
            name="Http Request"
            desciption={description}
            onSettings={() => {

            }}
            onDoubleClick={() => {

            }}
            >
                
            </BaseExecutionNode>
        </>
    )
})

HttpNode.displayName = "HttpNode"
