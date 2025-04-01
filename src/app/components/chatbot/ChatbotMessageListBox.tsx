import React, {
    ElementRef,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";
import ChatbotMessage from "./ChatbotMessage";
import { Role } from "@prisma/client";
import { ChatbotButtonProps } from "@/app/types/types";
import { cn } from "@/lib/utils";

interface MessageProps {
    role: Role;
    content: ReactNode;
}

interface ChatbotMessageListBoxProps {
    messages: MessageProps[];
    buttons: ChatbotButtonProps[];
    onButtonClick: (value: string) => void;
}

const ChatbotMessageListBox = ({
    messages,
    buttons,
    onButtonClick,
}: ChatbotMessageListBoxProps) => {
    const scrollRef = useRef<ElementRef<"div">>(null);

    const [buttonsWithDelay, setButtonsWithDelay] = useState<
        ChatbotButtonProps[]
    >([]);

    // 버튼 표시 전 딜레이 효과
    useEffect(() => {
        if (buttons.length > 0) {
            const timeout = setTimeout(() => {
                setButtonsWithDelay(buttons);
            }, 200);

            return () => clearTimeout(timeout);
        } else {
            setButtonsWithDelay([]);
        }
    }, [buttons]);

    // 초기 메시지 설정
    const initialMessage: MessageProps = {
        role: "system",
        content: `안녕하세요! 어떤 정보가 필요하신가요?`,
    };

    const allMessages = [initialMessage, ...messages];

    // 스크롤 자동 이동
    useEffect(() => {
        scrollRef?.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messages, buttonsWithDelay]);

    return (
        <div
            className="px-[15px] py-[10px] flex flex-col gap-y-[15px] bg-blue-100 
            min-w-[370px] min-h-[550px] w-full h-full flex-1 max-w-[600px] max-h-[98vh] 
            rounded-md overflow-y-auto"
        >
            {allMessages.map((msg, index) => (
                <ChatbotMessage
                    key={index}
                    content={msg.content}
                    role={msg.role}
                />
            ))}

            {buttonsWithDelay?.length > 0 && (
                <div
                    className={cn(
                        "flex flex-wrap gap-2 mt-2 self-end",
                        "animate-message-up"
                    )}
                >
                    {buttonsWithDelay.map((btn, index) => (
                        <button
                            key={index}
                            className="bg-[#22c4ff] text-white px-3 py-1 rounded"
                            onClick={() => onButtonClick(btn.value)}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            )}

            <div ref={scrollRef} />
        </div>
    );
};

export default ChatbotMessageListBox;
