// app/admin/dashboard/Modals/Shared/ConfirmationModal.tsx
import { Button } from '@/components/ui/button';

interface ConfirmationModalProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function DeleteConfirmationModal({
                                                    title,
                                                    message,
                                                    onConfirm,
                                                    onCancel,
                                                }: ConfirmationModalProps) {
    return (
        <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-6">{message}</p>
            <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="destructive" onClick={onConfirm}>
                    Delete
                </Button>
            </div>
        </div>
    );
}