import React, { ReactNode } from "react";
import ChatbotMessageListBox from "./ChatbotMessageListBox";
import { Role } from "@prisma/client";
import { ChatbotButtonProps } from "@/app/types/types";

interface MessageProps {
    role: Role;
    content: ReactNode;
}

interface ChatBotBoxProps {
    messages: MessageProps[];
    buttons: ChatbotButtonProps[];
    onSendMessage: (message: string) => void;
    onButtonClick: (value: string) => void;
    isLoading: boolean;
}

const ChatBotBox = ({ messages, buttons, onButtonClick }: ChatBotBoxProps) => {
    return (
        <div className="bg-gradient-to-br from-blue-400 via-blue-300 to-blue-400 w-screen h-screen flex flex-col items-center  justify-center px-5 py-5">
            <ChatbotMessageListBox
                messages={messages}
                buttons={buttons}
                onButtonClick={onButtonClick}
            />
        </div>
    );
};

export default ChatBotBox;
