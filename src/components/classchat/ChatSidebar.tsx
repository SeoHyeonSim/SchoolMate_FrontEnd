"use client";

import React from "react";
import { ChatParticipant, UserType } from "@prisma/client";
import { Laugh, Plus } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import ChatInviteModal from "./ChatInviteModal";
import { User, userTypeColors } from "@/app/types/types";

interface ChatSidebarProps {
    chatroomId: string;
    isOpen: boolean;
    participants: ChatParticipant[];
    userList: User[];
    handleUserSelect: (userId: string) => void;
    inviteUsers: () => void;
    setInviteOpen: (open: boolean) => void;
    isInviteOpen: boolean;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
    chatroomId,
    isOpen,
    participants,
    userList,
    handleUserSelect,
    inviteUsers,
    setInviteOpen,
    isInviteOpen,
}) => {
    const { user } = useUser();
    const currentUserName = user?.username;
    const currentUserId = user?.id;

    return (
        <div
            className={`bg-slate-100 rounded-xl transition-all duration-400 ${
                isOpen ? "w-[350px]" : "w-0"
            } overflow-hidden ease-in-out flex flex-col h-full`}
        >
            {isOpen && (
                <div className="p-2 flex flex-col h-full gap-y-2">
                    {/* 상단: Current User Profile */}
                    <div className="w-full h-[80px] flex items-center gap-3 px-4 border-blue-300 bg-blue-300 rounded-xl">
                        <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center">
                            <Laugh size={30} />
                        </div>
                        <div className="flex-1 flex items-center">
                            <div className="text-sm font-medium">
                                {currentUserName} (Me)
                            </div>
                        </div>
                    </div>

                    {/* Participants List */}
                    <div className="flex-grow max-h-[calc(100vh-330px)] overflow-y-auto border-2 border-blue-300 rounded-lg group scrollbar-hide">
                        {participants
                            .filter(
                                (participant) =>
                                    participant.userId !== currentUserId
                            )
                            .map((participant, index) => (
                                <div
                                    key={participant.id}
                                    className={`w-full h-[50px] flex items-center gap-3 px-4 border-b border-blue-300 ${
                                        index % 2 === 0
                                            ? "bg-blue-100"
                                            : "bg-blue-200"
                                    }`}
                                >
                                    <div
                                        className={`w-[30px] h-[30px] rounded-full flex items-center justify-center ${
                                            userTypeColors[
                                                participant.userType
                                            ] || "bg-gray-400"
                                        }`}
                                    >
                                        <Laugh size={20} />
                                    </div>
                                    <div className="flex-1 flex items-center">
                                        <div className="text-sm font-medium">
                                            {participant.userId}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* Invite Button (하단 고정) */}
                    <div className="w-full h-[80px] flex-shrink-0">
                        <button
                            className="w-full h-full border-2 hover:bg-blue-200 border-blue-400 rounded-xl flex items-center gap-3 px-4"
                            onClick={() => setInviteOpen(true)}
                        >
                            <div className="w-[40px] h-[40px] bg-blue-400 rounded-full flex items-center justify-center">
                                <Plus size={20} />
                            </div>
                            <div className="text-base font-medium">Invite</div>
                        </button>
                    </div>

                    {/* 초대 모달 */}
                    <ChatInviteModal
                        chatroomId={chatroomId}
                        isOpen={isInviteOpen}
                        closeModal={() => setInviteOpen(false)}
                        users={userList}
                        handleUserSelect={handleUserSelect}
                        inviteUsers={inviteUsers}
                    />
                </div>
            )}
        </div>
    );
};

export default ChatSidebar;
