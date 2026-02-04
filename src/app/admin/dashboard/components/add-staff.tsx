'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../../components/ui/dialog";
import { UserPlus2Icon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { useActionState } from "react";
import { addStaffForm } from "@/auth/actions";
import { Spinner } from "../../../../components/ui/spinner";

export default function AddStaff() {
    const [state, action, pending] = useActionState(addStaffForm, undefined);

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mr-4"><UserPlus2Icon /> Add New Staff</Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Staff Member</DialogTitle>
                    </DialogHeader>

                    <form className="space-y-4" action={action}>
                        <div>
                            <Label className="mb-2 ml-1.5">Full Name</Label>
                            <Input type="text" name="fullName" />
                            {state?.errors.fullName && (<p className="ml-1.5 text-red-500">{state.errors.fullName}</p>)}
                        </div>

                        <div>
                            <Label className="mb-2 ml-1.5">Role</Label>
                            <Input type="text" name="role" />
                            {state?.errors.role && (<p className="ml-1.5 text-red-500">{state.errors.role}</p>)}
                        </div>

                        <div>
                            <Label className="mb-2 ml-1.5">Email</Label>
                            <Input type="text" name="email" />
                            {state?.errors.email && (<p className="ml-1.5 text-red-500">{state.errors.email}</p>)}
                        </div>

                        <div>
                            <Label className="mb-2 ml-1.5">Password</Label>
                            <Input type="password" name="password" />
                            {state?.errors.password && (<p className="ml-1.5 text-red-500">{state.errors.password}</p>)}
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={pending}>{pending ? <Spinner /> : 'Create Staff'}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}