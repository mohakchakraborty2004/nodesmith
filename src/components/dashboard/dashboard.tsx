"use client"

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/client-auth";

const Dashboard = () => {

 const data = authClient.useSession().data
    return (
        <div>
            {JSON.stringify(data)}

            {data && (
                <Button onClick={()=> {
                    authClient.signOut();
                }}>
                    Logout
                </Button>
                )
}
        </div>

    )
}

export default Dashboard