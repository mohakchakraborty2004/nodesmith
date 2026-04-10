"use client"


import { useCreateWorkflow, useSuspenseWorkflow } from "@/hooks/client-suspense";
import useSearch from "@/hooks/params/use-debounce-search";
import { useWorkflowParams } from "@/hooks/params/use-workflow-params";
import { Button } from "@base-ui/react";
import { useState } from "react";
import { Input } from "../ui/input";



export default function WorkflowPage() {
    // const trpc = useTRPC();
    // const { data : workflows } = useSuspenseQuery(trpc.workflow.getWorkflows.queryOptions())
    const {data : workflows} = useSuspenseWorkflow();
    const createWorkflow = useCreateWorkflow();
    const [params , setParams] = useWorkflowParams()
    const {searchValue , onSearchChange} = useSearch({
        params,
        setParams,
        debounceMS: 1000
    })

    return (
        <div>
              <Button onClick={() => {
                createWorkflow.mutate()
            }}>
                Create Workflow
            </Button>
            <Input value={searchValue} onChange={(e) => onSearchChange(e.target.value)}></Input>
            {
             JSON.stringify(workflows)
             
            }
          
        </div>
    )
}