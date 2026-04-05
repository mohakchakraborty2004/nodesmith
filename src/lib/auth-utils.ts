import { auth } from "./auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const RequireAuth = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login"); 
    }
    }

    export const RequireUnAuth = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) {
        
        redirect("/dashboard"); 
    }
    }


  