"use client"

import { Button } from "@base-ui/react"
import { WorkflowIcon } from "lucide-react"
import { memo, useState } from "react"
import { NodeSelector } from "./Nodeselector"
import { useExecuteWorkflow } from "@/hooks/client-suspense"

export const ExecuteButton = memo(( { workflowId } : { workflowId : string} ) => {

    const executeWorkflow = useExecuteWorkflow()

    const handleExecution = () => {
        executeWorkflow.mutate({id : workflowId})
    }

    return <>
         <Button 
        onClick={() => {
            handleExecution()
        }}
        className="h-10 font-bold w-30 bg-slate-400 hover:bg-slate-200 transition-all rounded-2xl flex justify-center items-center cursor-pointer gap-2">
                 <WorkflowIcon className="size-4"></WorkflowIcon>
                 Execute
        </Button>
    </>
})

ExecuteButton.displayName = "ExecuteButton"