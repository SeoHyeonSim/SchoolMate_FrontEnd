"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface VideoChatroomTileProps {
    videoChatroom: {
        id: string;
        name: string;
        createdAt: string;
        isActive: boolean;
    };
}

const VideoChatroomTile = ({ videoChatroom }: VideoChatroomTileProps) => {
    const router = useRouter();

    const handleEnterChatroom = () => {
        if (videoChatroom.isActive) {
            router.push(`/list/chatrooms/videochat/${videoChatroom.id}`);
        }
    };

    return (
        <div
            key={videoChatroom.id}
            className={`rounded-md h-[60px] px-4 flex items-center overflow-hidden text-white text-[15px] borde ${
                videoChatroom.isActive ? "bg-green-300" : "bg-gray-300"
            }`}
        >
            <div className="w-1/3 truncate">{videoChatroom.name}</div>
            <div className="w-1/3 text-center truncate">
                {videoChatroom.createdAt}
            </div>
            <div className="ml-auto text-right">
                <button
                    onClick={handleEnterChatroom}
                    className={`w-[50px] h-[30px] flex items-center justify-center rounded-sm ${
                        videoChatroom.isActive ? "bg-green-400" : "bg-gray-400"
                    }`}
                    disabled={!videoChatroom.isActive}
                >
                    <div className="text-[12px]">Enter</div>
                </button>
            </div>
        </div>
    );
};

export default VideoChatroomTile;
