import { AnimatedLoader } from "@/components/loader";
import WorkflowPage from "@/components/workflow/page";
import { WorkflowErrorBoundary } from "@/components/workflow/error-boundary";
import { workflowLoader } from "@/hooks/params/param-loader";
import { RequireAuth } from "@/lib/auth-utils";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type props = {
    searchParams : Promise<SearchParams>
}


const Workflow = async ( { searchParams } : props) => {
    await RequireAuth();

    const params = await workflowLoader(searchParams);
    
    // Get the query client and prefetch in the same component
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(trpc.workflow.getWorkflows.queryOptions(params));

    return (
        <div>
           <HydrationBoundary state={dehydrate(queryClient)}>
                <WorkflowErrorBoundary>
                <Suspense fallback= {
                   <div className="min-h-screen flex flex-col items-center justify-center bg-surface">
            <AnimatedLoader size={50} strokeWidth={10} />
            <p className="mt-6 text-sm font-label uppercase tracking-widest text-on-surface-variant animate-pulse">
                Noding...
            </p>
        </div>
                }>
                    
                <WorkflowPage></WorkflowPage>
                </Suspense>
                </WorkflowErrorBoundary>
            </HydrationBoundary>
        </div>
    )
}

export default Workflow