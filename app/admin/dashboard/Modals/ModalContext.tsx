// app/admin/dashboard/Modals/ModalContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';
import ModalWrapper from './Shared/ModalWrapper';

type ModalType =
    | { type: 'addStory'; data?: never }
    | { type: 'editStory'; data: any }
    | { type: 'deleteStory'; data: any }
    | { type: 'addEvent'; data?: never }
    | { type: 'editEvent'; data: any }
    | { type: 'deleteEvent'; data: any }
    | { type: 'addNews'; data?: never }
    | { type: 'editNews'; data: any }
    | { type: 'deleteNews'; data: any }
    | { type: 'addResource'; data?: never }
    | { type: 'editResource'; data: any }
    | { type: 'deleteResource'; data: any }
    | { type: 'addAdmin'; data?: never }
    | { type: 'deleteAdmin'; data: any }
    | null;

interface ModalContextType {
    modal: ModalType;
    openModal: (modal: ModalType) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modal, setModal] = useState<ModalType>(null);

    const openModal = (modal: ModalType) => setModal(modal);
    const closeModal = () => setModal(null);

    return (
        <ModalContext.Provider value={{ modal, openModal, closeModal }}>
            {children}
            <ModalWrapper />
        </ModalContext.Provider>
    );
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error('useModal must be used within ModalProvider');
    return context;
};