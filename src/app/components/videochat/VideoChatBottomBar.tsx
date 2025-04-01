import { Reaction } from "@/app/types/types";
import {
    Hand,
    Heart,
    Laugh,
    List,
    Mic,
    MicOff,
    Smile,
    ThumbsUp,
    Video,
    VideoOff,
} from "lucide-react";
import React, { useState } from "react";

type VideoChatBottomBarProps = {
    toggleVideo: () => void;
    isVideoOn: boolean;
    toggleMic: () => void;
    isMicOn: boolean;
    toggleSidebar: () => void;
    selectedReaction: Reaction | null;
    setSelectedReaction: (reaction: Reaction | null) => void;
};

const reactionIcons = {
    [Reaction.WAVE]: <Hand size={30} />,
    [Reaction.THUMBS_UP]: <ThumbsUp size={30} />,
    [Reaction.SMILE]: <Smile size={30} />,
    [Reaction.HEART]: <Heart size={30} />,
    [Reaction.LAUGH]: <Laugh size={30} />,
};

const VideoChatBottomBar = ({
    toggleVideo,
    isVideoOn,
    toggleMic,
    isMicOn,
    toggleSidebar,
    selectedReaction,
    setSelectedReaction,
}: VideoChatBottomBarProps) => {
    const [isReactionBoxOpen, setIsReactionBoxOpen] = useState(false);

    return (
        <div className="bg-green-200 w-full h-[100px] flex absolute bottom-0 rounded-b-xl border-2 border-white">
            <button
                className="w-1/4 flex flex-col items-center pt-3"
                onClick={toggleVideo}
            >
                {isVideoOn ? <Video size={50} /> : <VideoOff size={50} />}
                <div>{isVideoOn ? "On Video" : "Off Video"}</div>
            </button>
            <button
                className="w-1/4 flex flex-col items-center pt-3"
                onClick={toggleMic}
            >
                {isMicOn ? <Mic size={50} /> : <MicOff size={50} />}
                <div>{isMicOn ? "On Mic" : "Off Mic"}</div>
            </button>
            <button
                className=" relative w-1/5 flex flex-col items-center  pt-3"
                onClick={() => setIsReactionBoxOpen(!isReactionBoxOpen)}
            >
                <Hand size={50} />
                <div>Reaction</div>
            </button>

            {/* 리액션 선택 박스 */}
            {isReactionBoxOpen && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2  mb-2 bg-white p-2 rounded-md shadow-lg flex space-x-2 transition-all duration-300">
                    {Object.entries(reactionIcons).map(([reaction, icon]) => (
                        <button
                            key={reaction}
                            className={`p-2 border rounded-md ${
                                selectedReaction === reaction
                                    ? "bg-blue-300"
                                    : "bg-gray-100"
                            }`}
                            onClick={() =>
                                setSelectedReaction(
                                    selectedReaction === reaction
                                        ? null
                                        : (reaction as Reaction)
                                )
                            }
                        >
                            {icon}
                        </button>
                    ))}
                </div>
            )}

            
            <button
                className="w-1/4 flex flex-col items-center  pt-3"
                onClick={toggleSidebar}
            >
                <List size={50} />
                <div>Participants</div>
            </button>
        </div>
    );
};

export default VideoChatBottomBar;
