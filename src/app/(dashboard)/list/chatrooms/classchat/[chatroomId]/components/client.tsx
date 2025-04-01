"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { ChatParticipant, UserType } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

import Messages, { MessageProps } from "@/app/components/classchat/Messages";
import ChatBar from "@/app/components/classchat/ChatBar";
import ChatSidebar from "@/app/components/classchat/ChatSidebar";

interface User {
    id: string;
    username: string;
    userType: UserType;
}

interface ChatroomClientProps {
    chatroomId: string;
}

const ChatroomClient: React.FC<ChatroomClientProps> = ({ chatroomId }) => {
    const router = useRouter();
    const { user } = useUser();
    const [chatroomName, setChatroomName] = useState("Loading...");
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [participants, setParticipants] = useState<ChatParticipant[]>([]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [userList, setUserList] = useState<User[]>([]); // 초대 가능한 유저 목록
    const [isInviteOpen, setInviteOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const currentUserId = user?.id || "";

    //  채팅방 정보 불러오기
    useEffect(() => {
        const fetchChatroom = async () => {
            try {
                const response = await fetch(`/api/classchat/${chatroomId}`);
                if (response.ok) {
                    const data = await response.json();
                    setChatroomName(data.name);
                } else if (response.status === 404) {
                    router.push("/dashboard/list/chatrooms/classchat");
                } else {
                    setChatroomName("Unknown Chatroom");
                }
            } catch (error) {
                console.error("채팅방 정보를 불러오는 중 오류 발생:", error);
                setChatroomName("Unknown Chatroom");
            }
        };

        if (chatroomId) {
            fetchChatroom();
        }
    }, [chatroomId, router]);

    //  메시지 목록 불러오기
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(
                    `/api/classchat/${chatroomId}/messages`
                );
                if (response.ok) {
                    const data: MessageProps[] = await response.json();
                    setMessages(data);
                }
            } catch (error) {
                console.error("메시지를 불러오는 중 오류 발생:", error);
            }
        };

        if (chatroomId) {
            fetchMessages();
        }
    }, [chatroomId]);

    //  메시지 추가 함수 (ChatBar에서 사용)
    const addMessage = async (messageContent: string) => {
        const newMessage: MessageProps = {
            id: crypto.randomUUID(),
            chatRoomId: chatroomId,
            senderId: currentUserId,
            senderName: "You",
            content: messageContent,
            createdAt: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);

        try {
            const response = await fetch(
                `/api/classchat/${chatroomId}/messages`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chatroomId,
                        senderId: currentUserId,
                        content: messageContent,
                    }),
                }
            );

            if (!response.ok) {
                console.error("메시지 전송 실패");
            }
        } catch (error) {
            console.error("메시지 전송 중 오류 발생:", error);
        }
    };

    // 채팅방 참여자 목록 불러오기
    const fetchParticipants = async () => {
        try {
            const response = await fetch(
                `/api/classchat/${chatroomId}/participants`
            );
            if (response.ok) {
                const data = await response.json();
                setParticipants(data);
            }
        } catch (error) {
            console.error("참여자 정보를 불러오는 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        if (chatroomId) {
            fetchParticipants();
        }
    }, [chatroomId]);

    // 유저 목록 불러오기
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/users`);
                if (response.ok) {
                    const data = await response.json();
                    setUserList(data);
                }
            } catch (error) {
                console.error("유저 목록을 불러오는 중 오류 발생:", error);
            }
        };

        if (isInviteOpen) {
            fetchUsers();
        }
    }, [isInviteOpen]);

    // 초대할 유저 선택
    const handleUserSelect = (userId: string) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    //  유저 초대 API 요청
    const inviteUsers = async () => {
        try {
            const response = await fetch(
                `/api/classchat/${chatroomId}/invite`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userIds: selectedUsers }),
                }
            );

            if (response.ok) {
                await fetchParticipants(); //  초대 후 최신 참여자 목록 불러오기
                setInviteOpen(false); // 모달 닫기
                setSelectedUsers([]); // 선택 초기화
            } else {
                console.error("유저 초대 실패");
            }
        } catch (error) {
            console.error("유저 초대 중 오류 발생:", error);
        }
    };

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0 flex h-full relative">
            {/* 채팅 메인 영역 */}
            <div
                className={`bg-[#e9f6ff] rounded-xl flex flex-col h-full justify-between transition-all duration-300 relative 
            ${isSidebarOpen ? "lg:w-[calc(100%-300px)]" : "w-full"} 
            w-full sm:w-full md:w-full`}
            >
                {/* 상단바 */}
                <div className="bg-blue-200 w-full h-[80px] rounded-t-2xl flex items-center px-5">
                    <div className="text-[24px] md:text-[30px] text-white">
                        {chatroomName}
                    </div>

                    {/* 사이드바 토글 버튼 */}
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="w-[40px] md:w-[50px] h-[40px] md:h-[50px] absolute right-0 bg-blue-400 hover:bg-blue-300 text-white rounded-full flex items-center justify-center px-[4.5px] mr-5"
                    >
                        {isSidebarOpen ? (
                            <ChevronLeft size={25} />
                        ) : (
                            <ChevronRight size={25} />
                        )}
                    </button>
                </div>

                {/* 메시지 표시 영역 */}
                <div className="pt-[20px] px-5 flex-1 overflow-auto">
                    <Messages
                        messages={messages}
                        currentUserId={currentUserId}
                    />
                </div>

                {/* 입력 바 */}
                <div>
                    <ChatBar chatroomId={chatroomId} addMessage={addMessage} />
                </div>
            </div>

            {/* 채팅방 참여자 사이드바 */}
            <ChatSidebar
                chatroomId={chatroomId}
                isOpen={isSidebarOpen}
                participants={participants}
                userList={userList}
                handleUserSelect={handleUserSelect}
                inviteUsers={inviteUsers}
                setInviteOpen={setInviteOpen}
                isInviteOpen={isInviteOpen}
            />
        </div>
    );
};

export default ChatroomClient;
