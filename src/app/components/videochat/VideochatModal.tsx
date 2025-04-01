import React, { useContext, useState } from "react";
import { SocketContext } from "./SocketContext";
import { Copy, Phone, PhoneOff, X } from "lucide-react";
import CopyToClipboard from "react-copy-to-clipboard";

type VideochatModalProps = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
};

const VideochatModal = ({ isOpen, onClose, children }: VideochatModalProps) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
        useContext(SocketContext);
    const [idToCall, setIdToCall] = useState("");

    if (!isOpen) return null;

    return (
        <div className="w-full max-w-lg mx-auto mt-8 p-6 bg-white border-2 border-black shadow-lg rounded-md relative">
            <form className="space-y-6">
                {/* 계정 정보 */}
                <div>
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 p-2"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <h6 className="text-lg font-semibold mb-2">Account Info</h6>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <CopyToClipboard
                        text={me}
                        onCopy={() =>
                            alert("Your ID has been copied to clipboard!")
                        }
                    >
                        <div className="w-full mt-2 p-2 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                            <Copy className="w-5 h-5 mr-2" /> Copy Your ID
                        </div>
                    </CopyToClipboard>
                </div>

                {/* 통화 기능 */}
                <div>
                    <h6 className="text-lg font-semibold mb-2">Make a call</h6>
                    <input
                        type="text"
                        placeholder="ID to call"
                        value={idToCall}
                        onChange={(e) => setIdToCall(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {callAccepted && !callEnded ? (
                        <div
                            className="w-full mt-2 p-2 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-md"
                            onClick={leaveCall}
                        >
                            <PhoneOff className="w-5 h-5 mr-2" /> Hang Up
                        </div>
                    ) : (
                        <div
                            className="w-full mt-2 p-2 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-md"
                            onClick={() => callUser(idToCall)}
                        >
                            <Phone className="w-5 h-5 mr-2" /> Call
                        </div>
                    )}
                </div>
            </form>

            {/* 추가 콘텐츠 */}
            <div className="mt-4">{children}</div>
        </div>
    );
};

export default VideochatModal;
