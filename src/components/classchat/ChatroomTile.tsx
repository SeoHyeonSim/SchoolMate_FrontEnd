"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ChatroomTileProps {
    chatroom: {
        id: string;
        name: string;
    };
}

const ChatroomTile = ({ chatroom }: ChatroomTileProps) => {
    const router = useRouter();
    return (
        <div
            key={chatroom.id}
            onClick={() =>
                router.push(`/list/chatrooms/classchat/${chatroom.id}`)
            }
            className="rounded-2xl bg-[#74b5ff] hover:bg-[#8dc2ff] hover:cursor-pointer h-[80px] px-4 flex items-center overflow-hidden text-white text-[25px]"
        >
            {chatroom.name}
        </div>
    );
};

export default ChatroomTile;
