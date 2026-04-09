import WorkflowPage from "@/components/workflow/page";
import { HydrateClient } from "@/hooks/hydration";
import { usePrefetch } from "@/hooks/suspense";
import { RequireAuth } from "@/lib/auth-utils";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { inferInput } from "@trpc/tanstack-react-query";
import { Suspense } from "react";


const Workflow = async (  ) => {
    await RequireAuth();
    usePrefetch();

    return (
        <div>
           <HydrateClient>
                <Suspense fallback= {
                    <div>
                        loadingg...
                    </div>
                }>
                <WorkflowPage></WorkflowPage>
                </Suspense>
            </HydrateClient>
        </div>
    )
}

export default Workflow