"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import VideoChatroomTile from "@/app/components/videochat/VideoChatroomTile";
import { Plus } from "lucide-react";
import CreateVideoChatModal from "@/app/components/videochat/CreateVideoChatModal";
import { User } from "@/app/types/types";

const VideoChatListPage = () => {
    const [chatrooms, setChatrooms] = useState<
        { id: string; name: string; createdAt: string; isActive: boolean }[]
    >([]);
    const { user } = useUser();
    const [userList, setUserList] = useState<User[]>([]); // 초대 가능한 유저 목록

    const [isModalOpen, setIsModalOpen] = useState(false);

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

        if (isModalOpen) {
            fetchUsers();
        }
    }, [isModalOpen]);

    // 서버에서 채팅방 목록 불러오기
    useEffect(() => {
        const fetchChatrooms = async () => {
            try {
                const res = await fetch("/api/videochat");
                if (res.ok) {
                    const data = await res.json();
                    setChatrooms(data);
                }
            } catch (error) {
                console.error("Failed to fetch chatrooms:", error);
            }
        };

        fetchChatrooms();
    }, []);

    // 채팅방 생성 함수
    const createChatroom = async (
        chatroomName: string,
        invitedUserIds: string[]
    ) => {
        try {
            const res = await fetch("/api/videochat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: chatroomName,
                    createdById: user?.id,
                    invitedUserIds,
                }),
            });

            if (res.ok) {
                const newChatroom = await res.json();

                setChatrooms((prev) => [newChatroom, ...prev]);
            }
        } catch (error) {
            console.error("Failed to create chatroom:", error);
        }
    };

    return (
        <div className="bg-white p-4 rounded-md h-full flex flex-col relative">
            <div className="bg-green-200 p-5 rounded-sm h-full border-solid">
                <div className="flex items-center">
                    <div className="text-[20px] font-bold">
                        Video Chat Rooms
                    </div>

                    {/* create videochatroom button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white w-[30px] h-[30px] rounded-full flex flex-col items-center justify-center ml-auto mr-3"
                    >
                        <Plus />
                    </button>
                </div>

                {/* video chatroom list */}
                <div className="bg-white rounded-md h-[540px] overflow-y-auto p-2 flex flex-col gap-3 mt-3">
                    <div className="flex items-center px-4 text-gray-600 font-medium border-b pb-2">
                        <div className="w-1/3">Chatroom Id</div>
                        <div className="w-1/3 text-center">Created Date</div>
                        <div className="w-1/3 mr-2 text-right">Enter</div>
                    </div>

                    {/* 리스트 타일 표시  */}
                    <div className="flex flex-col gap-2">
                        {chatrooms.length === 0 ? (
                            <div className="text-gray-500 text-center text-[20px] flex items-center justify-center h-full">
                                No chatroom created
                            </div>
                        ) : (
                            chatrooms.map((chatroom) => (
                                <VideoChatroomTile
                                    key={chatroom.id}
                                    videoChatroom={chatroom}
                                />
                            ))
                        )}
                    </div>
                </div>

                {isModalOpen && (
                    <CreateVideoChatModal
                        onClose={() => setIsModalOpen(false)}
                        onCreate={createChatroom}
                        users={userList}
                    />
                )}
            </div>
        </div>
    );
};

export default VideoChatListPage;
