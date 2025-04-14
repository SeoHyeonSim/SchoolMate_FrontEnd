import { User } from "@/app/types/types";
import React from "react";

interface VideoChatInviteModalProps {
    isOpen: boolean;
    closeModal: () => void;
    users: User[];
    handleUserSelect: (userId: string) => void;
    inviteUsers: () => void;
}

const VideoChatInviteModal: React.FC<VideoChatInviteModalProps> = ({
    isOpen,
    closeModal,
    users,
    handleUserSelect,
    inviteUsers,
}) => {
    if (!isOpen) return null;

    const groupedUsers = users.reduce(
        (acc: Record<string, User[]>, participant) => {
            if (!acc[participant.userType]) {
                acc[participant.userType] = [];
            }
            acc[participant.userType].push(participant);
            return acc;
        },
        {}
    );

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white p-6 rounded-lg w-[400px]">
                <h3 className="text-lg font-bold mb-4">Invite Users</h3>
                <div className="h-[300px] overflow-y-auto">
                    {Object.keys(groupedUsers).map((userType) => (
                        <div key={userType} className="mb-4">
                            <h3 className="font-bold text-lg">{userType}S</h3>
                            {groupedUsers[userType].map((participant) => (
                                <label
                                    key={participant.id}
                                    className="flex items-center gap-2 p-2 border-b"
                                >
                                    <input
                                        type="checkbox"
                                        onChange={() =>
                                            handleUserSelect(participant.id)
                                        }
                                    />
                                    {participant.username}
                                </label>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-400 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            inviteUsers();
                            closeModal();
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Invite
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoChatInviteModal;
