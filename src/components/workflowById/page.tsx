"use client";

import { useSuspenseWorkflowForId, useUpdateWorkflow } from "@/hooks/client-suspense";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Editor from "./editor-canvas/editor";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GetWorkflowByIdPage( {workflowId} : {workflowId : string} ) {
    const router = useRouter();
    const workflowDetails = useSuspenseWorkflowForId({id : workflowId})
    const [name , setName] = useState<string>(workflowDetails.data.data.name || "")
    const updateWorkflow = useUpdateWorkflow();

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center gap-4">
                    <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => router.push('/workflows')}
                        className="hover:bg-muted"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="h-6 w-px bg-border" />
                    <Input 
                        value={name}
                        placeholder="Workflow name" 
                        onChange={(e) => setName(e.target.value)}
                        className="w-64 h-9 font-medium"
                    />
                </div>
                <Button 
                    disabled={updateWorkflow.isPending || name === workflowDetails.data.data.name || name.length < 3}
                    onClick={() => {
                        updateWorkflow.mutate({
                            id : workflowDetails.data.data.id,
                            name : name
                        })
                    }}
                    size="sm"
                    className="gap-2"
                >
                    <Save className="h-4 w-4" />
                    { updateWorkflow.isPending ? "Saving..." : "Save"}
                </Button>
            </div>
            
            {/* Editor */}
            <div className="flex-1">
                <Editor workflowId={workflowId} />
            </div>
        </div>
    )
}