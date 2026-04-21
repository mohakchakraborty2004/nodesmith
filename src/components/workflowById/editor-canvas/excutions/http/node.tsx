import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../../base-execution-node";
import { GlobeIcon } from "lucide-react";
import HttpDialog, { FormType } from "./executionConfigDialog";

type HttpRequestNodeData = {
    endpoint? : string;
    method? : "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body? : string;
    variable : string;
    [key : string] : unknown;
}

type httpRequestNodeProps = Node<HttpRequestNodeData>

export const HttpNode = memo((props : NodeProps<httpRequestNodeProps>) => {
    
    const [open , setOpen] = useState(false);

    const nodeData = props.data
    const description = nodeData?.endpoint ? `${nodeData.method || "GET"} : ${nodeData.endpoint}` : "Not configured"
        const {setNodes} = useReactFlow();
    const handleOpenSettings = () => {
        setOpen(true)
    }

    const handleSubmit = (values : FormType) => { 
        setNodes((currentNodes) => {
            const updatedNodes = currentNodes.map((node) => {
                if(node.id === props.id){
                    return {
                        ...node,
                        data : {
                            ...node.data,
                            endpoint : values.endpoint,
                            method : values.method,
                            body : values.body,
                            variable: values.variable
                        }
                    }
                }
                return node;
            })
            return updatedNodes
        })
    }

    return (
        <>
                    <HttpDialog
                        open={open}
                        onOpenChange={() => setOpen(!open)}
                        defaultEndpoint={nodeData.endpoint}
                        defaultMethod={nodeData.method}
                        defaultBody={nodeData.body}
                        defaultVariable={nodeData.variable}
                        onSubmit={(values) => {
                                handleSubmit(values);
                        }}
                    />

          
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
