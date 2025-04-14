"use client";

import React, { useEffect, useState } from "react";
import ChatCreateModal from "@/components/classchat/ChatCreateModal";
import { useUser } from "@clerk/nextjs";
import ChatroomTile from "../../../../../components/classchat/ChatroomTile";
import CreateChatroomButton from "../../../../../components/classchat/CreateChatroomButton";

const ClassChatPage = () => {
    const [chatrooms, setChatrooms] = useState<{ id: string; name: string }[]>(
        []
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useUser();

    // 채팅방 목록 불러오기
    useEffect(() => {
        const fetchChatrooms = async () => {
            const response = await fetch("/api/classchat");
            if (response.ok) {
                const data = await response.json();
                setChatrooms(data); // 채팅방 목록 업데이트
            }
        };

        fetchChatrooms();
    }, []);

    // 채팅방 생성하기
    const createChatroom = async (chatroomName: string) => {
        const response = await fetch("/api/classchat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: chatroomName,
                createdById: user?.id,
            }),
        });

        if (response.ok) {
            const newChatroom = await response.json();
            setChatrooms((prev) => [...prev, newChatroom]);
            console.log("chatroom is created!");
        }
    };

    return (
        <div className="bg-white p-4 rounded-md h-full flex flex-col mt-0 relative">
            <div className="bg-[#aed2ff] p-4 rounded-md h-full">
                <div className="text-white text-[25px] font-bold">
                    Chatroom List
                </div>

                {/* chatroom list */}
                <div className="bg-white rounded-2xl h-3/4 overflow-y-auto p-4 flex flex-col gap-4 mt-5">
                    {chatrooms.length === 0 ? (
                        <div className="text-gray-500 text-center text-[20px] flex items-center justify-center h-full">
                            No chatroom created
                        </div>
                    ) : (
                        chatrooms.map((chatroom) => (
                            <ChatroomTile
                                key={chatroom.id}
                                chatroom={chatroom}
                            />
                        ))
                    )}
                </div>

                {/* Create Chatroom 버튼 */}
                <CreateChatroomButton onClick={() => setIsModalOpen(true)} />

                {isModalOpen && (
                    <ChatCreateModal
                        onClose={() => setIsModalOpen(false)}
                        onCreate={createChatroom}
                    />
                )}
            </div>
        </div>
    );
};

export default ClassChatPage;
