// server side

import { getQueryClient, trpc } from "@/trpc/server"
import { inferInput } from "@trpc/tanstack-react-query"

export type input = inferInput<typeof trpc.workflow.getWorkflows> 
export type inputForId = inferInput<typeof trpc.workflow.getWorkflowById>
export type inputForIdNodes = inferInput<typeof trpc.workflow.updateWorkflowNodes>


export const usePrefetch = (params : input) => {
    const queryClient = getQueryClient()

    return queryClient.prefetchQuery(trpc.workflow.getWorkflows.queryOptions(params))
}

export const useForIdPrefetch = (params : inputForId) => {
    const queryClient = getQueryClient()

    return queryClient.prefetchQuery(trpc.workflow.getWorkflowById.queryOptions(params))
}