"use client";

import React, { ElementRef, useEffect, useRef, useState } from "react";
import MessageTile from "./MessageTile";
import { Message } from "@prisma/client";

export interface MessageProps extends Message {
    senderName: string; // senderName을 추가
}

interface MessagesProps {
    messages: MessageProps[];
    currentUserId: string;
}

const Messages: React.FC<MessagesProps> = ({
    messages,
    currentUserId,
}) => {
    const scrollRef = useRef<ElementRef<"div">>(null);

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col gap-2">
            {messages.map((msg, index) => (
                <MessageTile
                    key={msg.id}
                    msg={msg}
                    currentUserId={currentUserId} 
                />
            ))}
        </div>
    );
};

export default Messages;
