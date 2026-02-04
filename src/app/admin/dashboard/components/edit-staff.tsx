'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { updateStaffForm } from "@/auth/actions";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type StaffType = {
    id: string;
    fullName: string;
    role: string;
    email: string;
}

export default function EditStaff({ staff }: { staff: StaffType }) {
    const [state, action, pending] = useActionState(updateStaffForm, undefined);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'ghost'} size={'sm'} className="cursor-pointer">Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Staff Information</DialogTitle>
                </DialogHeader>

                <form className="space-y-4" action={action}>
                    <div>
                        <Input type="hidden" name="id" value={staff.id} />
                    </div>
                    <div>
                        <Label className="mb-2 ml-1.5">Full Name</Label>
                        <Input type="text" name="fullName" defaultValue={staff.fullName} />
                        {state?.errors.fullName && (<p className="ml-1.5 text-red-500">{state.errors.fullName}</p>)}
                    </div>

                    <div>
                        <Label className="mb-2 ml-1.5">Role</Label>
                        <Input type="text" name="role" defaultValue={staff.role} />
                        {state?.errors.role && (<p className="ml-1.5 text-red-500">{state.errors.role}</p>)}
                    </div>

                    <div>
                        <Label className="mb-2 ml-1.5">Email</Label>
                        <Input type="text" name="email" defaultValue={staff.email} />
                        {state?.errors.email && (<p className="ml-1.5 text-red-500">{state.errors.email}</p>)}
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={pending}>{pending ? <Spinner /> : 'Update'}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}