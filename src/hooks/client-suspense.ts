// client side hooks 

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";


export const useSuspenseWorkflow = () => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.workflow.getWorkflows.queryOptions())
}

export const useCreateWorkflow = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();
    return useMutation(trpc.workflow.createWorkflow.mutationOptions({
        onSuccess : (data) => {
            toast.success(`${data.message}`)
            queryClient.invalidateQueries(trpc.workflow.getWorkflows.queryOptions());

        }, 
        onError : () => {
            toast.error("failed");
        }
    }))
}