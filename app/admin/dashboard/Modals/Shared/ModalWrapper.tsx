// app/admin/dashboard/Modals/Shared/ModalWrapper.tsx
// app/admin/dashboard/Modals/Shared/ModalWrapper.tsx
'use client';

import { useModal } from '../ModalContext';
import { X } from 'lucide-react';

// Import all modals
import AddStoryModal from '../Stories/AddStoryModal';
import EditStoryModal from '../Stories/EditStoryModal';
import DeleteStoryModal from '../Stories/DeleteStoryModal';
import AddEventModal from '../Events/AddEventModal';
import EditEventModal from '../Events/EditEventModal';
import DeleteEventModal from '../Events/DeleteEventModal';
import AddNewsModal from '../News/AddNewsModal';
import EditNewsModal from '../News/EditNewsModal';
import DeleteNewsModal from '../News/DeleteNewsModal';
import AddResourceModal from '../Resources/AddResourceModal';
import EditResourceModal from '../Resources/EditResourceModal';
import DeleteResourceModal from '../Resources/DeleteResourceModal';

export default function ModalWrapper() {
    const { modal, closeModal } = useModal();

    if (!modal) return null;

    return (
        <>
            {/* BACKDROP */}
            <div
                className="fixed inset-0 bg-black/20  bg-opacity-50 z-40"
                onClick={closeModal}
            />

            {/* MODAL CONTAINER */}
            <div className="fixed inset-0 z-50 flex items-center justify-center py-4 overflow-y-auto">
                <div
                    className="
            bg-white rounded-xl shadow-2xl w-full
            max-w-sm    /* mobile */
            sm:max-w-md
            md:max-w-2xl
            lg:max-w-4xl
            xl:max-w-5xl
            max-h-screen
            overflow-hidden
            flex flex-col
          "
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* CLOSE BUTTON */}
                    <button
                        onClick={closeModal}
                        className="
              absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white
              shadow-md transition-colors z-10
              sm:top-4 sm:right-4
            "
                    >
                        <X className="h-5 w-5 text-slate-600" />
                    </button>

                    {/* MODAL CONTENT — SCROLLABLE */}
                    <div className="flex-1 overflow-y-auto px-4 pt-12 pb-6 sm:px-6 sm:pt-14">
                        {/* RESPONSIVE MODAL RENDERING */}
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
            </div>
        </>
    );
}
