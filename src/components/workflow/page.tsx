"use client"


import { useCreateWorkflow, useSuspenseWorkflow } from "@/hooks/client-suspense";
import { Button } from "@base-ui/react";



export default function WorkflowPage() {
    // const trpc = useTRPC();
    // const { data : workflows } = useSuspenseQuery(trpc.workflow.getWorkflows.queryOptions())
    const {data : workflows} = useSuspenseWorkflow();
    const createWorkflow = useCreateWorkflow();

    return (
        <div>
              <Button onClick={() => {
                createWorkflow.mutate()
            }}>
                Create Workflow
            </Button>
            {
             JSON.stringify(workflows)
             
            }
          
        </div>
    )
}