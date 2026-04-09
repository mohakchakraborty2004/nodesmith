// server side

import { getQueryClient, trpc } from "@/trpc/server"
import { inferInput } from "@trpc/tanstack-react-query"

export type input = inferInput<typeof trpc.workflow.getWorkflows> 


export const usePrefetch = (params : input) => {
    const queryClient = getQueryClient()

    return queryClient.prefetchQuery(trpc.workflow.getWorkflows.queryOptions(params))
}

