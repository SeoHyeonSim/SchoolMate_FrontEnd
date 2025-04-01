import React, { useState } from "react";
import { MessageSquare, X } from "lucide-react";

const ChatBotIcon: React.FC = () => {
    const [chatbotIconVisible, setChatbotIconVisible] = useState(true);

    const handleClose = () => {
        setChatbotIconVisible(false);
    };

    if (!chatbotIconVisible) return null;

    const openChatWindow = () => {
        const minWidth = 440; // 창 너비
        const minHeight = 590; // 창 높이
        const left = window.screenX + (window.innerWidth - minWidth) / 2;
        const top = window.screenY + (window.innerHeight - minHeight) / 2;

        window.open(
            "/chatbot",
            "_blank",
            `width=${minWidth},height=${minHeight},top=${top},left=${left},resizable=no,scrollbars=no`
        );
    };

    return (
        <div className=" flex-col fixed right-12 bottom-5 z-50 w-[180px] h-[80px] justify-center">
            {/* 챗봇 아이콘 버튼 */}
            <button onClick={openChatWindow}>
                <div className="bg-gradient-to-br from-blue-300 to-blue-400 rounded-full transition-all duration-200 ease-in-out w-[200px] h-[60px] flex items-center ">
                    <div className="flex items-center justify-center bg-white rounded-full w-[50px] h-[50px] ml-2">
                        <MessageSquare size={35} />
                    </div>
                    <div className=" text-white pl-2 text-[20px]  font-bold flex items-center">
                        도우미 챗봇
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClose();
                        }}
                        className="bg-blue-200 w-7 h-7 rounded-full absolute bottom-3 -right-5 flex flex-col items-center justify-center"
                    >
                        <X color="white" size={20} />
                    </button>
                </div>
            </button>
        </div>
    );
};

export default ChatBotIcon;
