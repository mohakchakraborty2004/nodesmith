// client side hooks 

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useWorkflowParams } from "./params/use-workflow-params";
import { inputForId } from "./suspense";


export const useSuspenseWorkflow = () => {
    const trpc = useTRPC();
    const [params] = useWorkflowParams();
    return useSuspenseQuery(trpc.workflow.getWorkflows.queryOptions(params))
}

export const useSuspenseWorkflowForId = (params : inputForId) => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.workflow.getWorkflowById.queryOptions(params))
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

export const useUpdateWorkflow = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();

    return useMutation(trpc.workflow.updateWorkflow.mutationOptions({
        onSuccess : (data) => {
            toast.success(`${data.message}`)
            queryClient.invalidateQueries(trpc.workflow.getWorkflowById.queryOptions({id : data.data.id}))
            queryClient.invalidateQueries(trpc.workflow.getWorkflows.queryOptions({}));
        }
    }))
}

export const useDeleteWorkflow = () => { 
    const queryClient = useQueryClient();
    const trpc = useTRPC();

    return useMutation(trpc.workflow.deleteWorkflow.mutationOptions({
        onSuccess : (data) => {
            toast.success(`${data.message}`)
            queryClient.invalidateQueries(trpc.workflow.getWorkflows.queryOptions({}))
        }
    }))
}

export const useUpdateWorkflowNode = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC()

    return useMutation(trpc.workflow.updateWorkflowNodes.mutationOptions({
        onSuccess : (data) => {
            toast.success(`Workflow updated`)
            queryClient.invalidateQueries(trpc.workflow.getWorkflowById.queryOptions({id : data.id}))
            queryClient.invalidateQueries(trpc.workflow.getWorkflows.queryOptions({}));
        },
        onError : () => {
            toast.error("Failed to update or save workflow")
        }
    }))
}