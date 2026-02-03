import { getUser } from "@/auth/dal";
import { UserProvider } from "./context";
import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await getUser();

    if (user?.role !== 'staff') {
        redirect('/admin/dashboard');
    }
    return (
        <>
            <UserProvider value={user}>
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>
                        {children}
                    </SidebarInset>
                </SidebarProvider>
            </UserProvider>
        </>
    )
}