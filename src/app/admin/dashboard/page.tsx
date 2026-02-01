'use client';

import { logout } from "@/auth/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";


export default function AdminDashboard() {
    return (
        <>
            <div className="flex justify-between p-4 items-center h-32">
                <div>
                    <h2 className="text-4xl font-semibold">Super Admin Dashboard</h2>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="hover:cursor-pointer">
                            <Button variant={'ghost'} size={'icon'} className="rounded-full">
                                <Avatar size="lg">
                                    <AvatarImage src={'https://avatarfiles.alphacoders.com/377/thumb-1920-377591.png'} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Link href={'/admin/account'} className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-round-icon lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
                                    Account
                                    </Link>
                                </DropdownMenuItem>
                                <Separator className="mt-2 mb-2" />
                                <DropdownMenuItem onClick={() => logout()}>
                                    <LogOutIcon />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <Separator />
        </>
    )
}