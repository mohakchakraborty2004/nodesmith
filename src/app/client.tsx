"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function Client() {
    const trpc = useTRPC();
    const {data : users} = useSuspenseQuery(trpc.getUsers.queryOptions());
    return (
        <div>
            {users && (
                <div key={users.id}>{users.name} {users.email}</div>
            )}
        </div>
    );
}

