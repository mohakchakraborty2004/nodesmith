"use client";

import { useSuspenseWorkflowForId } from "@/hooks/client-suspense";

export default function GetWorkflowByIdPage( {workflowId} : {workflowId : string} ) {
    const workflowDetails = useSuspenseWorkflowForId({id : workflowId})

    return (
        <div>
            {JSON.stringify(workflowDetails.data)}
            <p>{workflowId}</p>
        </div>
    )
}