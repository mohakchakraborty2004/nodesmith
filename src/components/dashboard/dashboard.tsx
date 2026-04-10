"use client"

import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/subscription/use-subscription";
import { authClient } from "@/lib/client-auth";
import { useTRPC } from "@/trpc/client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Dashboard = () => {
 const data = authClient.useSession().data

 const subsData = useSubscription();
    return (
        <div>
            {JSON.stringify(data?.user)}
           
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

        

                </div>
                
                )
                
}
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