'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import { Calendar, LayoutDashboardIcon, LogOutIcon, MoreVerticalIcon, Ticket, UserCircle2Icon } from "lucide-react";
import { useUser } from "./context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { logout } from "@/auth/actions";
import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";

function SidebarItem({ href, icon: Icon, label }: { href: string; icon: LucideIcon; label: string; }) {
    const pathname = usePathname();
    const active = pathname.startsWith(href);

    return (
        <Link href={href} className="mb-3">
            <div className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${active ? "bg-neutral-800 text-white" : "text-neutral-400 hover:bg-neutral-800 hover:text-white"}`}>
                <Icon size={18} />
                <p>{label}</p>
            </div>
        </Link>
    )
}

export function AppSidebar() {
    const user = useUser();

    return (
        <Sidebar variant="floating">
            <SidebarHeader>
                <div className="flex gap-3 items-center">
                    <div className="border p-3 bg-blue-800 rounded-md">
                        <Ticket />
                    </div>
                    <div>
                        <p className="font-bold">Super Admin</p>
                        <p className="text-xs text-neutral-400">Ticketing System</p>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarItem href="/admin/dashboard" icon={LayoutDashboardIcon} label="Dashboard" />
                    <SidebarItem href="/admin/events" icon={Calendar} label="Events" />
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex justify-between items-center hover:bg-neutral-800 p-2 rounded-md">
                    <div className="flex gap-1.5">
                        <Avatar>
                            <AvatarImage src={'https://i.pinimg.com/736x/2e/a2/ae/2ea2ae3507b2e1ec78f191bbc851f040.jpg'} alt="shoyo.jpg" className="grayscale" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className="text-xs font-bold">
                            <p>{user?.fullName}</p>
                            <p className="text-neutral-500 font-semibold">{user?.email}</p>
                        </div>
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={'ghost'} size={'icon'}> <MoreVerticalIcon /> </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="start" className="w-(--radix-dropdown-menu-trigger-width) min-w-56">
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel className="mb-1.5 flex gap-2 px-1 py-1.5 text-left">
                                        <Avatar>
                                            <AvatarImage src={'https://i.pinimg.com/736x/2e/a2/ae/2ea2ae3507b2e1ec78f191bbc851f040.jpg'} alt="shoyo.jpg" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>

                                        <div className="text-xs font-bold">
                                            <p>{user?.fullName}</p>
                                            <p className="text-neutral-500 font-semibold">{user?.email}</p>
                                        </div>
                                    </DropdownMenuLabel>

                                    <Separator />

                                    <DropdownMenuItem className="mt-1.5 hover:cursor-pointer hover:bg-neutral-700 mb-1.5">
                                        <UserCircle2Icon />
                                        <p>Account</p>
                                    </DropdownMenuItem>

                                    <Separator />

                                    <DropdownMenuItem className="mt-1.5 hover:cursor-pointer hover:bg-neutral-700" onClick={() => logout()}>
                                        <LogOutIcon />
                                        <p>Logout</p>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}