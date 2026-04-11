"use client";

import { useSuspenseWorkflowForId, useUpdateWorkflow } from "@/hooks/client-suspense";
import { Input } from "@base-ui/react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function GetWorkflowByIdPage( {workflowId} : {workflowId : string} ) {
    const [name , setName] = useState<string>("")
    const workflowDetails = useSuspenseWorkflowForId({id : workflowId})
    const updateWorkflow = useUpdateWorkflow();

    return (
        <div>
            {JSON.stringify(workflowDetails.data)}
            <p>{workflowId}</p>
            <Input placeholder="update workflow name" onChange={(e : any) => {
                setName(e.target.value)
            }} ></Input>
            <Button 
            disabled={updateWorkflow.isPending}
            onClick={()=> {
                updateWorkflow.mutate({
                    id : workflowDetails.data.data.id,
                    name : name
                })
            }}>
                { updateWorkflow.isPending ? "Updating" : "Update name"}
            </Button>
        </div>
    )
}