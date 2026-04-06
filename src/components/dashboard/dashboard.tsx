"use client"

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/client-auth";
import { useTRPC } from "@/trpc/client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Dashboard = () => {
 const trpc = useTRPC();
 const queryClient = useQueryClient();
 const data = authClient.useSession().data
 const  workflows  = useQuery(trpc.getWorkflows.queryOptions())

 const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess : () => {
       toast("Workflow queued successfully")
    }
 }))
    return (
        <div>
            {JSON.stringify(data?.user)}
            {JSON.stringify(workflows.data)}
            {data && (
                <div>

                <Button onClick={()=> {
                    authClient.signOut();
                }}>
                    Logout
                </Button>

                <Button disabled={create.isPending} onClick={() => {
                    create.mutate()
                }}>
                    Create Workflow
                </Button>

                </div>
                
                )
}
        </div>

    )
}

export default Dashboard