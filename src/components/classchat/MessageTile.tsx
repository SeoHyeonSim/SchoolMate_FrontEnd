"use client";

import React from "react";
import { Laugh } from "lucide-react";
import { MessageProps } from "./Messages";

export interface MessageTileProps {
    msg: MessageProps;
    currentUserId: string;
}

const MessageTile = ({
    msg,
    currentUserId,
}: MessageTileProps) => {
    return (
        <div
            key={msg.id}
            className={`flex gap-2 pb-5 ${
                msg.senderId === currentUserId ? "justify-end" : ""
            }`} 
        >
            <div
                className={`w-[30px] h-[30px] mt-2 bg-yellow-400 rounded-full flex items-center justify-center ${
                    msg.senderId === currentUserId ? "order-last" : ""
                }`}
            >
                <Laugh size={20} />
            </div>

            {/* 유저 이름 표시 */}
            <div className="flex flex-col">
                <div
                    className={`text-gray-700 text-sm pb-2 pl-2 ${
                        msg.senderId === currentUserId
                            ? "justify-end text-right"
                            : ""
                    }`} 
                >
                    {msg.senderId === currentUserId ? "You" : msg.senderName}
                </div>
                <div className="bg-white w-[300px] h-[80px] rounded-2xl flex px-3 py-2">
                    {msg.content}
                </div>
            </div>

            <div
                className={`text-gray-500 text-[12px] self-end ${
                    msg.senderId === currentUserId ? "order-first" : "pl-2"
                }`}
            >
                {new Date(msg.createdAt).toLocaleTimeString()}
            </div>
        </div>
    );
};

export default MessageTile;
