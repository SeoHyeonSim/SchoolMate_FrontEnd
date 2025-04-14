import React, {
    JSXElementConstructor,
    useContext,
    useEffect,
    useState,
} from "react";
import { SocketContext } from "./SocketContext";
import { Hand, Heart, Laugh, Smile, ThumbsUp } from "lucide-react";
import { Reaction } from "@/app/types/types";
import { useUser } from "@clerk/nextjs";

interface VideoPlayerProps {
    isVideoOn: boolean;
    isMicOn: boolean;
    selectedReaction: Reaction | null;
}

const reactionIcons: Record<Reaction, JSX.Element> = {
    [Reaction.WAVE]: <Hand size={30} />,
    [Reaction.THUMBS_UP]: <ThumbsUp size={30} />,
    [Reaction.SMILE]: <Smile size={30} fill="yellow" />,
    [Reaction.LAUGH]: <Laugh size={30} fill="yellow" />,
    [Reaction.HEART]: <Heart size={30} color="none" fill="red" />,
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    isVideoOn,
    isMicOn,
    selectedReaction,
}) => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
        useContext(SocketContext);

    const { user } = useUser();
    const currentUserName = user?.username;

    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        if (!stream) return;

        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        microphone.connect(analyser);

        const detectSpeaking = () => {
            analyser.getByteFrequencyData(dataArray);
            const volume =
                dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

            setIsSpeaking(volume > 20);

            requestAnimationFrame(detectSpeaking);
        };

        detectSpeaking();

        return () => {
            audioContext.close();
        };
    }, [stream]);

    return (
        <div className="flex flex-wrap justify-center space-x-4 md:space-x-8">
            {/* 내 비디오 */}
            {stream && (
                <div
                    className={`p-4 border-2 rounded-md shadow-lg w-[550px] md:w-[300px] ${
                        isSpeaking ? "border-yellow-300" : "border-black"
                    }`}
                >
                    <h5 className="text-xl font-semibold text-center">
                        {currentUserName || "Name"}
                    </h5>

                    <div className="relative w-full">
                        <video
                            playsInline
                            muted
                            ref={myVideo}
                            autoPlay
                            className="w-full rounded-md"
                        />

                        {selectedReaction && (
                            <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md">
                                {reactionIcons[selectedReaction]}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 상대방 비디오 */}
            {callAccepted && !callEnded && (
                <div className="p-4 border-2 border-black rounded-md shadow-lg w-[550px] md:w-[300px]">
                    <h5 className="text-xl font-semibold text-center">
                        {call.name || "ANON"}
                    </h5>
                    <video
                        playsInline
                        ref={userVideo}
                        autoPlay
                        className="w-full rounded-md"
                    />
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
