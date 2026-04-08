import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/client-auth";


export const useSubscription = () => {
    return useQuery({
        queryKey : ["subscription"],
        queryFn : async () => {
            const {data} = await authClient.customer.state()
            return data
        }
    })
}