"use client";

import React, { useContext, useState } from "react";
import { ContextProvider, SocketContext } from "./SocketContext";
import VideoPlayer from "./VideoPlayer";
import VideochatSidebar from "./VideochatSidebar";
import VideoChatBottomBar from "./VideoChatBottomBar";
import { Reaction } from "@/app/types/types";
import { VideoChatParticipant } from "@prisma/client";

interface VideoChatProps {
    chatroom: {
        id: string;
        name: string;
        isActive: boolean;
    };
    participants: VideoChatParticipant[];
}

const VideoChat = ({ chatroom, participants }: VideoChatProps) => {
    return (
        <ContextProvider>
            <VideoChatContent chatroom={chatroom} participants={participants} />
        </ContextProvider>
    );
};

const VideoChatContent = ({ chatroom, participants }: VideoChatProps) => {
    const [isVideochatSidebarOpen, setVideochatSidebarOpen] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isMicOn, setIsMicOn] = useState(true);
    const [selectedReaction, setSelectedReaction] = useState<Reaction | null>(
        null
    );

    const context = useContext(SocketContext);

    const { myVideo, stream, toggleUserVideo, toggleUserMic, me } = context;

    if (!context) {
        return <div>Chatroom loading...</div>;
    }

    const toggleSidebar = () => {
        setVideochatSidebarOpen((prev) => !prev);
    };

    const toggleVideo = () => {
        const newVideoStatus = !isVideoOn;
        toggleUserVideo(me, newVideoStatus); // 내 비디오 상태만 변경
        setIsVideoOn(newVideoStatus);
    };

    // const toggleVideo = () => {
    //     if (myVideo.current && stream) {
    //         const tracks: MediaStreamTrack[] = stream.getVideoTracks();
    //         tracks.forEach(
    //             (track: MediaStreamTrack) => (track.enabled = !track.enabled)
    //         );
    //         setIsVideoOn((prev) => !prev);
    //     }
    // };

    // const toggleMic = () => {
    //     if (myVideo.current && stream) {
    //         const tracks: MediaStreamTrack[] = stream.getAudioTracks();
    //         tracks.forEach(
    //             (track: MediaStreamTrack) => (track.enabled = !track.enabled)
    //         );
    //         setIsMicOn((prev) => !prev);
    //     }
    // };

    const toggleMic = () => {
        const newMicStatus = !isMicOn;
        toggleUserMic(me, newMicStatus); // 내 마이크 상태만 변경
        setIsMicOn(newMicStatus);
    };

    return (
        <div className=" bg-green-300 p-4 rounded-md w-full h-full flex">
            <div className="flex flex-col items-center w-full h-full bg-green-50 relative rounded-xl p-2">
                <VideoPlayer
                    isVideoOn={isVideoOn}
                    isMicOn={isMicOn}
                    selectedReaction={selectedReaction}
                />
                <VideoChatBottomBar
                    toggleVideo={toggleVideo}
                    isVideoOn={isVideoOn}
                    toggleMic={toggleMic}
                    isMicOn={isMicOn}
                    toggleSidebar={toggleSidebar}
                    selectedReaction={selectedReaction}
                    setSelectedReaction={setSelectedReaction}
                />
            </div>

            <VideochatSidebar
                isOpen={isVideochatSidebarOpen}
                participants={participants}
            />
        </div>
    );
};

export default VideoChat;
