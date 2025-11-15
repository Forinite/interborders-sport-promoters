// app/admin/dashboard/AdminLayoutClient.tsx
'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import { ModalProvider } from './Modals/ModalContext';
import {Toaster} from "sonner";
import {ToastProvider} from "@/components/ui/use-toast";

export default function AdminLayoutClient({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <ModalProvider>
            {/*<ToastProvider >*/}
                <div className="flex h-screen bg-gray-50">
                    <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                        <main className="flex-1 overflow-y-auto p-6">{children}</main>
                    </div>
                </div>
            {/*    <Toaster />*/}
            {/*</ToastProvider>*/}

        </ModalProvider>
    );
}