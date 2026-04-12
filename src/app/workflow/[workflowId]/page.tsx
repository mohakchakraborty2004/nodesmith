import { AnimatedLoader } from "@/components/loader";
import GetWorkflowByIdPage from "@/components/workflowById/page";
import { HydrateClient } from "@/hooks/hydration";
import { useForIdPrefetch } from "@/hooks/suspense";
import { RequireAuth } from "@/lib/auth-utils";
import { Suspense } from "react";

interface WorkflowProps {
    params : Promise<{
        workflowId : string
    }>
}

const Workflow = async ({params}: WorkflowProps) => {
    await RequireAuth();
    const { workflowId } = await params;

    useForIdPrefetch({id : workflowId})

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
            {/* <h1>Workflow ID: {workflowId}</h1> */}
            <GetWorkflowByIdPage 
             workflowId={workflowId}
            >
            </GetWorkflowByIdPage>
                </Suspense>
            </HydrateClient>
        </div>

    )
}

export default Workflow