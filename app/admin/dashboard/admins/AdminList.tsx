'use client';

import { Button } from "@/components/ui/button";
import { useModal } from "../Modals/ModalContext";
import { Users, Plus, Mail, Trash2, Edit } from "lucide-react";
import {AdminAccount} from "@/types";

export default function AdminList({ admins } :{ admins: AdminAccount[]}) {
    const { openModal } = useModal();

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#0A84FF]" /> Admin Accounts
                </h2>

                <Button
                    onClick={() => openModal({ type: "addAdmin" })}
                    className="bg-[#0A84FF] hover:bg-[#086fdc] text-white rounded-lg"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Admin
                </Button>
            </div>

            <div className="divide-y divide-slate-200">
                {admins.length === 0 && (
                    <p className="text-sm text-slate-500 py-4">No admins added yet.</p>
                )}

                {admins.map((admin) => (
                    <div
                        key={admin._id}
                        className="py-4 flex justify-between items-center"
                    >
                        <div>
                            <p className="text-sm font-medium text-slate-800">{admin.name}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                                <Mail className="h-3 w-3" /> {admin.email}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">

                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => openModal({ type: "deleteAdmin", data: admin })}
                            >
                                <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
