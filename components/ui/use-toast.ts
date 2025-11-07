// components/ui/use-toast.ts
'use client';

import * as React from 'react';
import { toast as sonnerToast, Toaster } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Toaster>;

const ToastProvider = (props: ToasterProps) => {
    return <Toaster {...props} />;
};

export const useToast = () => {
    return {
        toast: sonnerToast,
    };
};

export { ToastProvider };