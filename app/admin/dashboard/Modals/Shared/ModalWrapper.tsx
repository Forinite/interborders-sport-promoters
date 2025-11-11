// app/admin/dashboard/Modals/Shared/ModalWrapper.tsx
// app/admin/dashboard/Modals/Shared/ModalWrapper.tsx
'use client';

import { useModal } from '../ModalContext';
import AddStoryModal from '../Stories/AddStoryModal';
import EditStoryModal from '../Stories/EditStoryModal';
import DeleteStoryModal from '../Stories/DeleteStoryModal';
import AddEventModal from "@/app/admin/dashboard/Modals/Events/AddEventModal";
import AddNewsModal from "@/app/admin/dashboard/Modals/News/AddNewsModal";
import EditEventModal from "@/app/admin/dashboard/Modals/Events/EditEventModal";
import DeleteEventModal from "@/app/admin/dashboard/Modals/Events/DeleteEventModal";
import EditNewsModal from "@/app/admin/dashboard/Modals/News/EditNewsModal";
import DeleteNewsModal from "@/app/admin/dashboard/Modals/News/DeleteNewsModal";
import AddResourceModal from "@/app/admin/dashboard/Modals/Resources/AddResourceModal";
import EditResourceModal from "@/app/admin/dashboard/Modals/Resources/EditResourceModal";
import DeleteResourceModal from "@/app/admin/dashboard/Modals/Resources/DeleteResourceModal";

export default function ModalWrapper() {
    const { modal, closeModal } = useModal();
    if (!modal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-lg w-full max-h-screen overflow-y-auto">
                {modal.type === 'addStory' && <AddStoryModal />}
                {modal.type === 'editStory' && <EditStoryModal story={modal.data} />}
                {modal.type === 'deleteStory' && <DeleteStoryModal story={modal.data} />}

                {modal.type === 'addEvent' && <AddEventModal />}
                {modal.type === 'editEvent' && <EditEventModal event={modal.data} />}
                {modal.type === 'deleteEvent' && <DeleteEventModal event={modal.data} />}

                {modal.type === 'addNews' && <AddNewsModal />}
                {modal.type === 'editNews' && <EditNewsModal news={modal.data} />}
                {modal.type === 'deleteNews' && <DeleteNewsModal news={modal.data} />}

                {modal.type === 'addResource' && <AddResourceModal />}
                {modal.type === 'editResource' && <EditResourceModal resource={modal.data} />}
                {modal.type === 'deleteResource' && <DeleteResourceModal resource={modal.data} />}
            </div>
        </div>
    );
}