// app/admin/dashboard/Modals/Admins/AddAdminModal.tsx
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useModal } from "../ModalContext";
import { useToast } from "@/components/ui/use-toast";

export default function InviteAdminFormModal() {
    const { closeModal } = useModal();
    const { toast } = useToast();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            toast({ title: "Missing Fields", description: "All fields are required.", variant: "destructive" });
            return;
        }

        if (form.password !== form.confirmPassword) {
            toast({ title: "Password Mismatch", description: "Passwords must match.", variant: "destructive" });
            return;
        }

        setLoading(true);

        const res = await fetch("/api/admin-account/add", {
            method: "POST",
            body: JSON.stringify(form),
        });

        setLoading(false);

        if (!res.ok) {
            toast({ title: "Error", description: "Failed to create admin", variant: "destructive" });
            return;
        }

        toast({ title: "Admin Created", description: `New admin added: ${form.name}` });
        closeModal();
        location.reload();
    };

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Add Admin</h2>

            <div className="space-y-3">
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                />

                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                />

                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                />

                <input
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                />
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button variant="ghost" onClick={closeModal}>Cancel</Button>

                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-blue-600 text-white"
                >
                    {loading ? "Creating..." : "Create Admin"}
                </Button>
            </div>
        </div>
    );
}
