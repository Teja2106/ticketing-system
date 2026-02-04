'use client';

import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { StaffType } from "@/auth/formSchema";
import { Input } from "@/components/ui/input";
import { deleteStaff } from "@/auth/actions";

export default function DeleteStaff({ staff }: { staff: StaffType }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={'destructive'} size={'sm'} className="cursor-pointer">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription asChild>
                    <p>Are you sure you want to <strong>remove {staff.fullName}</strong> from the staff?</p>
                </AlertDialogDescription>
                <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                <form action={deleteStaff}>
                    <Input type="hidden" name="id" value={staff.id} />
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit" variant={'destructive'} className="cursor-pointer">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}