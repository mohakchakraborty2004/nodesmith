import { auth } from "./auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const RequireAuth = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login"); 
    } else{
        redirect("/dashboard");
    }
    }


  