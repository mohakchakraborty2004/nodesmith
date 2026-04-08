import WorkflowPage from "@/components/workflow/page";
import { RequireAuth } from "@/lib/auth-utils";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { inferInput } from "@trpc/tanstack-react-query";
import { Suspense } from "react";


type input = inferInput<typeof trpc.workflow.getWorkflows> 

const Workflow = async ( params : input ) => {
     const queryClient = getQueryClient()
     await RequireAuth()
     const { search } = await params
     const query = queryClient.prefetchQuery(trpc.workflow.getWorkflows.queryOptions({ search }))

    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback= {
                    <div>
                        loadingg...
                    </div>
                }>
                <WorkflowPage></WorkflowPage>
                </Suspense>
            </HydrationBoundary>
        </div>
    )
}

export default Workflow