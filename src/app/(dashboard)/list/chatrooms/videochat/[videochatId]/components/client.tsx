"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import VideoChat from "@/app/components/videochat/VideoChat";
import { VideoChatParticipant } from "@prisma/client";

const VideoChatClient = () => {
    const { videochatId } = useParams();
    const [chatroom, setChatroom] = useState<any>(null);
    const [participants, setParticipants] = useState<VideoChatParticipant[]>(
        []
    );

    // 채팅방 정보 가져오기
    const fetchChatroomData = async () => {
        try {
            console.log(`Fetching chatroom data for id: ${videochatId}...`);
            const res = await fetch(`/api/videochat/${videochatId}`);
            if (res.ok) {
                const data = await res.json();
                setChatroom(data);
            } else {
                console.error("Failed to fetch chatroom data");
            }
        } catch (error) {
            console.error("Error fetching chatroom data:", error);
        }
    };

    // 참여자 목록 가져오기
    const fetchParticipantsData = async () => {
        try {
            console.log(
                `Fetching participants for chatroom id: ${videochatId}...`
            );
            const res = await fetch(
                `/api/videochat/${videochatId}/participants`
            );
            if (res.ok) {
                const data = await res.json();
                setParticipants(data);
            } else {
                console.error("Failed to fetch participants");
            }
        } catch (error) {
            console.error("Error fetching participants:", error);
        }
    };

    useEffect(() => {
        if (videochatId) {
            fetchChatroomData(); // 채팅방 정보 먼저 가져옴
            fetchParticipantsData(); // 참여자 정보 가져옴
        }
    }, [videochatId]);

    return <VideoChat chatroom={chatroom} participants={participants} />;
};

export default VideoChatClient;
