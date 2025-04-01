"use client";

import React, { createContext, useState, useRef, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import Peer from "simple-peer";
import { VideoChatParticipant } from "@prisma/client";

interface CallProps {
    isReceivingCall?: boolean;
    from?: string;
    name?: string;
    signal?: any;
}

interface SocketContextType {
    call: CallProps;
    callAccepted: boolean;
    myVideo: React.RefObject<HTMLVideoElement>;
    userVideo: React.RefObject<HTMLVideoElement>;
    stream: MediaStream | null;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    callEnded: boolean;
    me: string;
    callUser: (id: string) => void;
    leaveCall: () => void;
    answerCall: () => void;
    updateActiveStatus: (isActive: boolean) => void;
}

const SocketContext = createContext<any>(null);

const socket: Socket = io("http://localhost:5000", {
    transports: ["websocket"],
}); // 서버 주소

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [name, setName] = useState("");
    const [call, setCall] = useState<CallProps>({});
    const [me, setMe] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [usersStatus, setUsersStatus] = useState<{ [key: string]: boolean }>(
        {}
    );
    const [participants, setParticipants] = useState<VideoChatParticipant[]>(
        []
    );

    // 초기값을 `document.createElement("video")`로 설정
    const myVideo = useRef<HTMLVideoElement>(document.createElement("video"));
    const userVideo = useRef<HTMLVideoElement>(document.createElement("video"));
    const connectionRef = useRef<Peer.Instance | null>(null);

    const callUser = (id: string) => {
        console.log(`Calling user with id: ${id}`);

        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream!,
        });

        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name,
            });
        });

        peer.on("stream", (currentStream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = currentStream;
            }
        });

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current?.destroy(); // Peer 연결 해제
        window.location.reload();
    };

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream!,
        });

        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: call.from });
        });

        peer.on("stream", (currentStream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = currentStream;
            }
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const updateActiveStatus = (isActive: boolean) => {
        setIsActive(isActive);
        socket.emit("updateActiveStatus", { userId: me, isActive });
    };

    const toggleUserVideo = (userId: string, isVideoOn: boolean) => {
        socket.emit("toggleVideo", { userId, isVideoOn });

        if (userId === me) {
            const tracks = (
                myVideo.current?.srcObject as MediaStream
            )?.getVideoTracks();
            tracks?.forEach((track) => (track.enabled = isVideoOn));
            console.log("Yeah, it's my vid.");

        }
    };

    const toggleUserMic = (userId: string, isMicOn: boolean) => {
        socket.emit("toggleMic", { userId, isMicOn });

        // 내 마이크 상태 실시간 제어 추가
        if (userId === me) {

            const tracks = (
                myVideo.current?.srcObject as MediaStream
            )?.getAudioTracks();
            tracks?.forEach((track) => (track.enabled = isMicOn));

            console.log("Yeah, it's my mic.");

        }
    };

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);

                // myVideo.current가 존재하는 경우에만 srcObject 설정
                if (myVideo.current) {
                    myVideo.current.srcObject = currentStream;
                }
            })
            .catch((error) =>
                console.error("Error accessing media devices:", error)
            );

        socket.removeAllListeners();

        socket.on("me", (id) => {
            console.log("서버에서 받은 ID:", id);
            setMe(id);
        });

        socket.on("callUser", ({ from, name: callerName, signal }) => {
            setCall({
                isReceivingCall: true,
                from,
                name: callerName,
                signal,
            });
        });

        socket.on("userStatusUpdate", ({ userId, isActive }) => {
            setParticipants((prevParticipants) => {
                return prevParticipants.map((participant) =>
                    participant.userId === userId
                        ? { ...participant, isActive }
                        : participant
                );
            });
        });

        socket.on("updateVideoStatus", ({ isVideoOn }) => {
            const tracks = (
                myVideo.current?.srcObject as MediaStream
            )?.getVideoTracks();
            tracks?.forEach((track) => (track.enabled = isVideoOn));
        });

        socket.on("updateMicStatus", ({ isMicOn }) => {
            const tracks = (myVideo.current?.srcObject as MediaStream)?.getAudioTracks();
            tracks?.forEach((track) => (track.enabled = isMicOn));
        });

        return () => {
            socket.off("me");
            socket.off("callUser");
            socket.off("userStatusUpdate");
            socket.off("updateVideoStatus");
            socket.off("updateMicStatus");
        };
    }, []);

    return (
        <SocketContext.Provider
            value={{
                call,
                callAccepted,
                myVideo,
                userVideo,
                stream,
                name,
                setName,
                callEnded,
                me,
                callUser,
                leaveCall,
                answerCall,
                updateActiveStatus,
                usersStatus,
                participants,
                toggleUserVideo,
                toggleUserMic,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };
