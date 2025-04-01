"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ChatroomClient from "./components/client";

const ChatRoomPage = () => {
    const router = useRouter();
    const { chatroomId } = useParams();
    const chatroomIdString = Array.isArray(chatroomId)
        ? chatroomId[0]
        : chatroomId;

    useEffect(() => {
        if (!chatroomIdString) {
            router.push("/list/chatrooms/classchat");
        }
    }, [chatroomIdString, router]);

    if (!chatroomIdString) {
        return null; 
    }

    return <ChatroomClient chatroomId={chatroomIdString} />;
};

export default ChatRoomPage;
