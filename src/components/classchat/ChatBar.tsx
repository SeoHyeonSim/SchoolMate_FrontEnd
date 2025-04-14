"use client";

import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";

interface ChatBarProps {
    chatroomId: string;
    addMessage: (messageContent: string) => void;
}

const ChatBar: React.FC<ChatBarProps> = ({ chatroomId, addMessage }) => {
    const [message, setMessage] = useState("");
    const { user } = useUser();

    const handleSendMessage = () => {
        if (!message.trim()) return;

        addMessage(message); // 즉시 반영
        setMessage(""); // 입력 필드 초기화
    };

    return (
        <div className="bg-slate-300 w-full h-[110px] rounded-b-xl">
            <form
                className="px-[25px] py-4 flex gap-x-4 h-[110px]"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                }}
            >
                <input
                    className="w-5/6 rounded-xl border-gray-300 px-5"
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className="flex justify-center items-center w-1/6">
                    <button
                        type="submit"
                        className="bg-blue-400 hover:bg-blue-300 rounded-xl h-[80px] w-[140px]"
                    >
                        <div className="text-white font-bold">Send</div>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatBar;
