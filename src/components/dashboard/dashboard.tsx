"use client"

import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/subscription/use-subscription";
import { authClient } from "@/lib/client-auth";
import { useTRPC } from "@/trpc/client";
import { portal } from "@polar-sh/better-auth";

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

 const ai = useMutation(trpc.testAi.mutationOptions({
    onSuccess : () => {
       toast("AI function queued successfully")
    }
 }))

 const subsData = useSubscription();
    return (
        <div>
            {JSON.stringify(data?.user)}
            {JSON.stringify(workflows.data)}
           
            {data && (
                <div>
                    {
                        !subsData && (
                            <div>
                                <Button onClick={()=> {
                    authClient.checkout({slug : "nodesmith-pro"})
                }}>
                    Upgrade to pro
                </Button>
                            </div>
                        )
                    }

            
                            <div>
                    <Button onClick={()=> {
                    authClient.customer.portal()
                }}>
                    billing portal
                </Button>
                            </div>
                       

                

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
              <div>
                <Button disabled={ai.isPending} onClick={() => {
                    ai.mutate()
                }}>
                    Test AI Function
                </Button>
                <div>
                    {ai && <p>{JSON.stringify(ai)}</p>}
                </div>
            </div>

            <div>
                {subsData && (
                    <div>
                       nodesmith pro subscription : {JSON.stringify(subsData.data?.activeSubscriptions)}
                    </div>
                    
                )}
            </div>
        </div>

    )
}

export default Dashboard