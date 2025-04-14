import React, { useState } from "react";

interface chatbotFormProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

const ChatbotForm = ({ onSendMessage, isLoading }: chatbotFormProps) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input);
            setInput("");
        }
    };

    return (
        <div className="bg-yellow-200 min-w-[370px] h-[65px] rounded-md flex items-center px-2">
            <form className="flex w-full" onSubmit={handleSubmit}>
                <input
                    className="flex-grow w-5/6 h-[50px] rounded-md p-2 outline-none"
                    placeholder="Type your message"
                    type="text"
                    value={input}
                    disabled={isLoading}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-1/6 h-[50px] bg-sky-400 hover:bg-sky-300 disabled:bg-sky-100 rounded-md flex justify-center items-center ml-2 "
                    disabled={isLoading}
                >
                    <span className="text-white font-bold">Send</span>
                </button>
            </form>
        </div>
    );
};

export default ChatbotForm;
