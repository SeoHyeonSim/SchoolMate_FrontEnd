import React, { useState } from "react";
import { User } from "@/app/types/types";
import ChatInviteModal from "../classchat/ChatInviteModal";
import VideoChatInviteModal from "./VideoChatInviteModal";

interface CreateVideoChatModalProps {
    onClose: () => void;
    onCreate: (chatroomName: string, invitedUserIds: string[]) => void;
    users: User[];
}

const CreateVideoChatModal: React.FC<CreateVideoChatModalProps> = ({
    onClose,
    onCreate,
    users,
}) => {
    const [chatroomName, setChatroomName] = useState("");
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

    const handleUserSelect = (userId: string) => {
        setSelectedUserIds((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const handleCreateChatroom = () => {
        onCreate(chatroomName || "", selectedUserIds);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] h-[240px]">
                <h2 className="text-lg font-bold mb-4">Create Chatroom</h2>
                <input
                    type="text"
                    className="w-full h-[60px] p-2 border rounded-lg mb-4"
                    placeholder="Enter chatroom name"
                    value={chatroomName}
                    onChange={(e) => setChatroomName(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => setIsInviteModalOpen(true)}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                        초대하기
                    </button>
                    <button
                        onClick={handleCreateChatroom}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        확인
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
                    >
                        취소
                    </button>
                </div>
            </div>

            {/* 초대 모달 */}
            <VideoChatInviteModal
                isOpen={isInviteModalOpen}
                closeModal={() => setIsInviteModalOpen(false)}
                users={users}
                handleUserSelect={handleUserSelect}
                inviteUsers={() => setIsInviteModalOpen(false)}
            />
        </div>
    );
};

export default CreateVideoChatModal;
