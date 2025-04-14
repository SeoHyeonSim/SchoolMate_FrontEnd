// VideochatSidebar.tsx
"use client";

import React, { useContext } from "react";
import { SocketContext } from "./SocketContext"; // SocketContext 임포트
import { Laugh, Moon, Sun } from "lucide-react";
import { userTypeColors } from "@/app/types/types"; // 유저 색상 코드
import { VideoChatParticipant } from "@prisma/client";
import { useUser } from "@clerk/nextjs";

interface VideochatSidebarProps {
    isOpen: boolean;
    participants: VideoChatParticipant[]; // 데이터베이스에서 가져온 participants
}

const VideochatSidebar: React.FC<VideochatSidebarProps> = ({
    isOpen,
    participants,
}) => {
    const { participants: socketParticipants } = useContext(SocketContext); // SocketContext에서 participants 받아오기

    const { user } = useUser();
    const currentUserName = user?.username;
    const currentUserId = user?.id;

    // 데이터베이스 participants와 socketParticipants를 결합
    const mergedParticipants = participants.map((participant) => {
        const socketParticipant = socketParticipants.find(
            (socket: any) => socket.userId === participant.userId
        );

        // socket의 상태가 존재하면 업데이트
        if (socketParticipant) {
            return {
                ...participant,
                isActive: socketParticipant.isActive,
            };
        }

        // 없으면 기본 상태는 오프라인
        return {
            ...participant,
            isActive: false,
        };
    });

    return (
        <div
            className={`bg-green-100 rounded-xl transition-all duration-400 ${
                isOpen ? "w-[350px]" : "w-0"
            } overflow-hidden ease-in-out flex flex-col h-full`}
        >
            {isOpen && (
                <div className="p-2 flex flex-col h-full gap-y-2">
                    {/* 상단: Current User Profile */}
                    <div className="w-full h-[80px] flex items-center gap-5 px-4 border-green-300 bg-green-300 rounded-xl">
                        <div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center">
                            <Laugh size={30} />
                        </div>
                        <div className="flex-1 flex items-center">
                            <div className="text-sm font-medium">
                                {currentUserName} (Me)
                            </div>
                        </div>
                    </div>

                    {/* 참가자 목록 */}
                    <div className="flex-grow max-h-[calc(100vh-250px)] overflow-y-auto border-2 border-green-300 rounded-lg group scrollbar-hide">
                        {mergedParticipants
                            .filter(
                                (participant) =>
                                    participant.userId !== currentUserId
                            )
                            .map((participant, index) => (
                                <div
                                    key={participant.id}
                                    className={`w-full h-[50px] flex items-center gap-3 px-4 border-b border-green-300 ${
                                        index % 2 === 0
                                            ? "bg-green-100"
                                            : "bg-green-200"
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
                                    {/* 상태 표시 */}
                                    <div
                                        className={`flex flex-col items-center justify-center  h-[30px] w-[30px] rounded-full ${
                                            participant.isActive
                                                ? "bg-sky-300"
                                                : "bg-blue-950"
                                        }`}
                                    >
                                        {participant.isActive ? (
                                            <Sun fill="orange" color="none"/>
                                        ) : (
                                            <Moon fill="yellow" color="none" />
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideochatSidebar;
