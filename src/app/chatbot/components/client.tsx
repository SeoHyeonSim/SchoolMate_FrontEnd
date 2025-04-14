"use client";

import { useState, useEffect, ReactNode } from "react";
import ChatBotBox from "@/components/chatbot/ChatBotBox";
import { Role } from "@prisma/client";
import {
    assignmentButtons,
    assignmentFilterButtons,
    ChatbotButtonProps,
    ChatbotResponseType,
    examFilterButtons,
    initialButtons,
    mealButtons,
    toFirstPageButton,
} from "@/app/types/types";

import WeekMenuList from "@/components/chatbot/messageForm/Menu/WeekMenuList";
import TodayMenuList from "@/components/chatbot/messageForm/Menu/TodayMenuList";
import ChatbotAssignmentForm from "@/components/chatbot/messageForm/Assignment/ChatbotAssignmentsForm";
import ChatbotExamsForms from "@/components/chatbot/messageForm/Exam/ChatbotExamsForm";
import ChatbotEventsForm from "@/components/chatbot/messageForm/Event/ChatbotEventsForm";
import LinkButton from "@/components/chatbot/LinkButton";

interface MessageProps {
    role: Role;
    content: ReactNode;
}

const ChatbotClient = () => {
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [buttons, setButtons] = useState<ChatbotButtonProps[]>([]);

    useEffect(() => {
        const initializeChatbot = async () => {
            setButtons(initialButtons);
        };

        initializeChatbot();
    }, []);

    // 이전 메시지 불러오기
    useEffect(() => {
        const fetchMessages = async () => {
            console.log("fetching previous messages...");
            try {
                const response = await fetch(`/api/chatbot/messages`);

                if (!response.ok) {
                    throw new Error("Failed to fetch previous messages");
                }

                const data = await response.json();

                setMessages(data.messages);
            } catch (error) {
                console.error("Error fetching previous messages:", error);
            }
        };

        fetchMessages();
    }, []);

    // 메시지 전송하기
    const sendMessage = async (message: string) => {
        if (!message.trim()) return;

        setIsLoading(true);

        try {
            const response = await fetch("/api/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            const recievedData = await response.json();

            let replyContent: ReactNode;

            switch (recievedData.type) {
                // 이번주 급식
                case ChatbotResponseType.WEEK_MENU:
                    replyContent = (
                        <WeekMenuList menuList={recievedData.reply} />
                    );
                    break;
                // 오늘의 급식
                case ChatbotResponseType.TODAY_MENU:
                    replyContent = recievedData.reply ? (
                        <TodayMenuList {...recievedData.reply} />
                    ) : (
                        <p>오늘의 급식 정보가 없습니다.</p>
                    );
                    break;
                // 다가오는 과제
                case ChatbotResponseType.UPCOMING_ASSIGNMENT:
                    replyContent = recievedData.reply.length ? (
                        <ChatbotAssignmentForm
                            assignmentList={recievedData.reply}
                        />
                    ) : (
                        <p>다가오는 과제가 없습니다.</p>
                    );
                    break;

                case ChatbotResponseType.ASSIGNMENT_BY_LESSONS:
                    replyContent = recievedData.reply.length ? (
                        <ChatbotAssignmentForm
                            assignmentList={recievedData.reply}
                        />
                    ) : (
                        <p>해당 과목의 과제가 없습니다.</p>
                    );
                    break;

                case ChatbotResponseType.UPCOMING_EXAM:
                    replyContent = recievedData.reply.length ? (
                        <ChatbotExamsForms examList={recievedData.reply} />
                    ) : (
                        <p>다가오는 시험이 없습니다.</p>
                    );
                    break;

                case ChatbotResponseType.EXAM_BY_LESSONS:
                    replyContent = recievedData.reply.length ? (
                        <ChatbotExamsForms examList={recievedData.reply} />
                    ) : (
                        <p>해당 과목의 시험이 없습니다.</p>
                    );
                    break;

                case ChatbotResponseType.UPCOMING_EVENT:
                    replyContent = recievedData.reply.length ? (
                        <ChatbotEventsForm eventList={recievedData.reply} />
                    ) : (
                        <p>다가오는 행사가 없습니다.</p>
                    );
                    break;

                default:
                    replyContent = <p>{recievedData.reply}</p>;
                    break;
            }

            // 챗봇 응답 처리
            const botMessage: MessageProps = {
                role: Role.system,
                content: replyContent,
            };

            setMessages((prev) => [...prev, botMessage]);

            // 응답에 버튼이 포함되면 상태에 설정
            if (recievedData.buttons) {
                setButtons([...recievedData.buttons]);
            } else {
                setButtons([toFirstPageButton]);
            }
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // 버튼 클릭 시 메시지 전송 처리
    const handleButtonClick = (value: string) => {
        // 버튼 사라지게 하기
        setButtons([]);

        // 유저가 메시지를 보낸 것처럼 설정
        const userMessage: MessageProps = { role: Role.user, content: value };
        setMessages((prev) => [...prev, userMessage]);

        // 메시지 전송 처리
        switch (value) {
            case "과제와 시험":
                console.log("과제와 시험");
                setTimeout(() => {
                    setButtons([...assignmentButtons, toFirstPageButton]);
                    setMessages((prev) => [
                        ...prev,
                        {
                            role: Role.system,
                            content: "원하시는 정보를 선택해 주세요.",
                        },
                    ]);
                }, 250);
                break;

            case "과제":
                console.log("과제");
                setTimeout(() => {
                    setButtons([...assignmentFilterButtons, toFirstPageButton]);
                    setMessages((prev) => [
                        ...prev,
                        {
                            role: Role.system,
                            content: <LinkButton linkTo={"/list/assignments"} />,
                        },
                    ]);
                }, 250);
                break;

            case "시험":
                console.log("시험");
                setTimeout(() => {
                    setButtons([...examFilterButtons, toFirstPageButton]);
                    setMessages((prev) => [
                        ...prev,
                        {
                            role: Role.system,
                            content: <LinkButton linkTo={"/list/exams"} />,
                        },
                    ]);
                }, 250);
                break;

            case "급식":
                console.log("급식");
                setTimeout(() => {
                    setButtons([...mealButtons, toFirstPageButton]);
                    setMessages((prev) => [
                        ...prev,
                        {
                            role: Role.system,
                            content: "원하시는 정보를 선택해 주세요.",
                        },
                    ]);
                }, 250);
                break;

            case "처음으로":
                setTimeout(() => {
                    setMessages((prev) => [
                        ...prev,
                        {
                            role: Role.system,
                            content: "안녕하세요! 어떤 정보가 필요하신가요?",
                        },
                    ]);
                }, 250);

                setTimeout(() => {
                    setButtons(initialButtons);
                }, 250);
                break;

            default:
                setTimeout(() => {
                    sendMessage(value);
                }, 250);
                break;
        }
    };

    return (
        <div>
            <ChatBotBox
                messages={messages}
                onSendMessage={sendMessage}
                isLoading={isLoading}
                buttons={buttons}
                onButtonClick={handleButtonClick}
            />
        </div>
    );
};

export default ChatbotClient;
