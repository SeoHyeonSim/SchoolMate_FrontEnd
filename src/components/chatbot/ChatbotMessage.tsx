import { cn } from "@/lib/utils";
import { Role } from "@prisma/client";
import React, { ReactNode } from "react";

interface ChatbotMessageProps {
    content: ReactNode;
    role: Role;
}

const ChatbotMessage = ({ content, role }: ChatbotMessageProps) => {
    return (
        <div
            className={cn(
                `bg-white min-w-[270px] min-h-[50px] max-w-[90%] max-h-[400px] rounded-md flex items-start overflow-y-auto p-2 flex-shrink-0 shadow-md ${
                    role === Role.user ? "self-end" : "self-start"
                }`,
                "animate-message-up"
            )}
        >
            <div
                className={`p-2 break-words white-space-pre-wrap ${
                    role === Role.user ? "justify-end" : "justify-start"
                }`}
            >
                {content}
            </div>
        </div>
    );
};

export default ChatbotMessage;
