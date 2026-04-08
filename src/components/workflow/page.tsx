"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";


export default function WorkflowPage() {
    const trpc = useTRPC();
    const { data : workflows } = useSuspenseQuery(trpc.workflow.getWorkflows.queryOptions({}))

    return (
        <div>
            {
             JSON.stringify(workflows)
            }
        </div>
    )
}