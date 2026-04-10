import { AnimatedLoader } from "@/components/loader";
import WorkflowPage from "@/components/workflow/page";
import { HydrateClient } from "@/hooks/hydration";
import { workflowLoader } from "@/hooks/params/param-loader";
import { usePrefetch , input} from "@/hooks/suspense";
import { RequireAuth } from "@/lib/auth-utils";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { inferInput } from "@trpc/tanstack-react-query";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

type props = {
    searchParams : Promise<SearchParams>
}


const Workflow = async ( { searchParams } : props) => {
    await RequireAuth();

    const params = await workflowLoader(searchParams)
    usePrefetch(params);

    return (
        <div>
           <HydrateClient>
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
            </HydrateClient>
        </div>
    )
}

export default Workflow