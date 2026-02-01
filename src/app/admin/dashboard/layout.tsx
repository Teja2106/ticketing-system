import { getUser } from "@/auth/dal";
import { UserProvider } from "./context";
import React from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await getUser();

    return (
        <>
            <UserProvider value={user}>
                { children }
            </UserProvider>
        </>
    )
}