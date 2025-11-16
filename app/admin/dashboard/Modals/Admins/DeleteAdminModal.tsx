// app/admin/dashboard/Modals/Admin/DeleteAdminModal.tsx

'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useModal } from "../ModalContext";
import { useToast } from "@/components/ui/use-toast";

export default function DeleteAdminModal({ data }) {
    const { closeModal } = useModal();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);

        const res = await fetch(`/api/admin-account/delete?id=${data._id}`, {
            method: "DELETE",
        });

        setLoading(false);

        if (!res.ok) {
            toast({
                title: "Error",
                description: "Failed to delete admin.",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Admin Deleted",
            description: `${data.name} has been removed.`,
        });

        closeModal();
        location.reload(); // refresh the list
    };

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Delete Admin?</h2>

            <p className="text-sm text-slate-600">
                Are you sure you want to remove <span className="font-semibold">{data.name}</span> from Admin Accounts?
                This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 pt-4">
                <Button variant="ghost" onClick={closeModal}>
                    Cancel
                </Button>

                <Button
                    onClick={handleDelete}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 text-white"
                >
                    {loading ? "Deleting..." : "Delete"}
                </Button>
            </div>
        </div>
    );
}
