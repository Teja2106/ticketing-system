'use client';

import { staffLogin } from "@/auth/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useActionState } from "react";

export default function AdminLogin() {
    const [state, action, pending] = useActionState(staffLogin, undefined);
    return (
        <>
            <div className="h-screen flex items-center justify-center">
                <Card className="w-full max-w-lg">
                    <CardHeader>
                        <CardTitle>Login into Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action={action}>
                            <div>
                                <div className="flex justify-center text-red-500 mb-3">
                                    {state?.message}
                                </div>
                                <Label className="ml-1.5 mb-2">Email</Label>
                                <Input type="text" name="email" placeholder="user@org.com" />
                            </div>
                            {state?.errors?.email && (<p className="ml-1.5 text-red-500">{state.errors.email}</p>)}

                            <div className="mt-6 mb-6">
                                <Label className="ml-1.5 mb-2">Password</Label>
                                <Input type="password" name="password" placeholder="******" />
                            </div>
                            {state?.errors?.password && (<p className="ml-1.5 text-red-500">{state.errors.password}</p>)}

                            <Separator className="w-full" />
                            <div className="mt-4">
                                <Button type="submit" className="w-full" disabled={pending}>{pending ? <Spinner /> : 'Login'}</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}