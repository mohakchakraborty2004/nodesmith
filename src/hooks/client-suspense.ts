// client side hooks 

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useWorkflowParams } from "./params/use-workflow-params";


export const useSuspenseWorkflow = () => {
    const trpc = useTRPC();
    const [params] = useWorkflowParams();
    return useSuspenseQuery(trpc.workflow.getWorkflows.queryOptions(params))
}

export const useCreateWorkflow = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();
    return useMutation(trpc.workflow.createWorkflow.mutationOptions({
        onSuccess : (data) => {
            toast.success(`${data.message}`)
            queryClient.invalidateQueries(trpc.workflow.getWorkflows.queryOptions({}));

        }, 
        onError : () => {
            toast.error("failed");
        }
    }))
}