"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function Client() {
    const trpc = useTRPC();
    const {data : users} = useSuspenseQuery(trpc.getUsers.queryOptions());
    return (
        <div>
            {users.map((user) => (
                <div key={user.id}>{user.name} {user.email}</div>
            ))}
        </div>
    );
}
