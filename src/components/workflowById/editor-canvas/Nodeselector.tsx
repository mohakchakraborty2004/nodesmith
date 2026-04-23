import {Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { NodeType } from "@/generated/prisma/enums"
import { useReactFlow } from "@xyflow/react";
import { FormIcon, GlobeIcon, MousePointer2Icon } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";
import {createId} from "@paralleldrive/cuid2"


export type NodeTypeProps = {
 type : NodeType;
 name : string;
 description : string;
 icon : React.ComponentType< {className? : string}> | string;
}

const triggerNodes : NodeTypeProps[] =[
    {
        type : NodeType.MANUAL_TRIGGER,
        name : "Manual Trigger",
        description : "Trigger workflows with a click manually",
        icon : MousePointer2Icon
    } , 
    {
        type : NodeType.GOOGLE_FORM_TRIGGER,
        name : "Google Form Trigger",
        description : "Trigger workflows when a Google Form is submitted",
        icon : FormIcon
    }
]

const executionNodes : NodeTypeProps[] = [
    {
        type : NodeType.HTTP_TRIGGER,
        name : "HTTP Trigger",
        description : "Trigger workflows via HTTP requests",
        icon : GlobeIcon
    }
]


interface NodeSelectorProps {
    open : boolean;
    onOpenChange : (open : boolean) => void;
    children : React.ReactNode
}

export function NodeSelector({
    open,
    onOpenChange,
    children
} : NodeSelectorProps) {

    const {setNodes , getNodes, screenToFlowPosition} = useReactFlow();

    const handleNode = useCallback((Node : NodeTypeProps)=> {
        if(Node.type === NodeType.MANUAL_TRIGGER || Node.type === NodeType.GOOGLE_FORM_TRIGGER ) {
        const hasMannualNode = getNodes().some(
            (node) => node.type === NodeType.MANUAL_TRIGGER
        )
           const hasGooglelNode = getNodes().some(
            (node) => node.type === NodeType.GOOGLE_FORM_TRIGGER
        )

        if(hasMannualNode || hasGooglelNode){
            toast.error("a manual trigger or Google form trigger node already exists")
            return;
        } 
    }

        setNodes((nodes) => {
            const initialTriggerNodeExists = getNodes().some((node) => {
                return node.type === NodeType.INITIAL;
            });

            const centreX = window.innerWidth / 2;
            const centreY = window.innerHeight / 2;

            const flowPosition = screenToFlowPosition({
                x: centreX + (Math.random() - 0.5) * 200,
                y: centreY + (Math.random() - 0.5) * 200,
            });

            const newNode = {
                id: createId(),
                data: {},
                position: flowPosition,
                type: Node.type,
                name: Node.name,
                description: Node.description,
            };

            if (initialTriggerNodeExists) {
                return [newNode]
            }

            return [...nodes, newNode];
        });

        onOpenChange(false)

    }, [
        setNodes,
        getNodes,
        onOpenChange,
        screenToFlowPosition
    ])

    return <>
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent side="right" className="w-full">
                <SheetHeader>
                    <SheetTitle>Select Type of Node</SheetTitle>
                    <SheetDescription>Choose nodes from trigger or execution types</SheetDescription>
                </SheetHeader>
            <div>

                <SheetTitle className="p-4 font-extrabold">
                    Trigger Nodes
                </SheetTitle>

                 { triggerNodes.map((node) => {
                    const Icon = node.icon

                    return(
                        <div key={node.type} 
                        onClick={() => {
                            handleNode(node)
                        }}
                        className="flex hover:border-left hover:border-black hover:border-l-2 p-3 gap-4 cursor-pointer ">
                            <div className="flex justify-center items-center">
                                <Icon></Icon>
                            </div>
                            <div className="flex flex-col m-0.5">
                                <h1 className="text-sm font-extrabold">{node.name}</h1>
                                <p className="text-xs font-light text-gray-400">{node.description}</p>
                            </div>
                        </div>
                    )
                }
                )

                }

                 <SheetTitle className="p-4 mt-4 font-extrabold">
                    Execution Nodes
                </SheetTitle>

                 { executionNodes.map((node) => {
                    const Icon = node.icon

                    return(
                        <div key={node.type} 
                         onClick={() => {
                            handleNode(node)
                        }}
                        className="flex hover:border-left hover:border-black hover:border-l-2 p-3 gap-4 cursor-pointer ">
                            <div className="flex justify-center items-center">
                                <Icon></Icon>
                            </div>
                            <div className="flex flex-col m-0.5">
                                <h1 className="text-sm font-extrabold">{node.name}</h1>
                                <p className="text-xs font-light text-gray-400">{node.description}</p>
                            </div>
                        </div>
                    )
                }
                )

                }

            </div>
    
            </SheetContent>
        </Sheet>
    </>
}