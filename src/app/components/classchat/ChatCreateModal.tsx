import React, { useState } from "react";

interface ChatCreateModalProps {
    onClose: () => void;
    onCreate: (chatroomName: string) => void;
}

const ChatCreateModal: React.FC<ChatCreateModalProps> = ({
    onClose,
    onCreate,
}) => {
    const [chatroomName, setChatroomName] = useState("");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] h-[200px]">
                <h2 className="text-lg font-bold mb-4">Create Chatroom</h2>
                <input
                    type="text"
                    className="w-full h-[60px] p-2 border rounded-lg mb-4"
                    placeholder="Enter chatroom name"
                    value={chatroomName}
                    onChange={(e) => setChatroomName(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => {
                            if (chatroomName.trim()) {
                                onCreate(chatroomName);
                                onClose()
                            }
                        }}
                        className=" w-[80px] px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        확인
                    </button>
                    <button
                        onClick={onClose}
                        className="w-[80px] px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatCreateModal;
