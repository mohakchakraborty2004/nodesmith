import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../../base-execution-node";
import { GemIcon, GlobeIcon } from "lucide-react";
import GeminiDialog, { GeminiFormType } from "./triggerDialog";

type NodeData = {
    model : "gemini-2.5-flash" | "gemini-2.0-flash";
    userPrompt : string;
    systemPrompt : string;
    variable : string;
    apiKey : string;    
    [key : string] : unknown;
}

type GeminiNodeProps = Node<NodeData>

export const GeminiNode = memo((props : NodeProps<GeminiNodeProps>) => {
    
    const [open , setOpen] = useState(false);

    const nodeData = props.data
    const description = nodeData?.model ? `Model : ${nodeData.model}` : "Not configured"
    const {setNodes} = useReactFlow();
    const handleOpenSettings = () => {
        setOpen(true)
    }

    const handleSubmit = (values : GeminiFormType) => { 
        setNodes((currentNodes) => {
            const updatedNodes = currentNodes.map((node) => {
                if(node.id === props.id){
                    return {
                        ...node,
                        data : {
                            ...node.data,
                            model : values.model,
                            userPrompt : values.userPrompt,
                            systemPrompt : values.systemPrompt,
                            variable: values.variable,
                            apiKey : values.apiKey
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
                    <GeminiDialog
                        open={open}
                        onOpenChange={() => setOpen(!open)}
                        defaultModel={nodeData.model}
                        defaultSystemPrompt={nodeData.systemPrompt}
                        defaultUserPrompt={nodeData.userPrompt}
                        defaultVariable={nodeData.variable}
                        onSubmit={(values) => {
                                handleSubmit(values);
                        }}
                    />

          
            <BaseExecutionNode
            {...props}
            icon={GemIcon}
            name="Gemini Trigger"
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

GeminiNode.displayName = "GeminiNode"
