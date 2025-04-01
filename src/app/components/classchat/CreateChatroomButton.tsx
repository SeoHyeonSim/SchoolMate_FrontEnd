import { Plus } from "lucide-react";
import React from "react";

interface CreateChatroomButtonProps {
    onClick: () => void;
}

const CreateChatroomButton = ({ onClick }: CreateChatroomButtonProps) => {
    return (
        <div
            className="absolute bottom-4 left-4 right-4 w-auto h-[80px] m-4 flex items-center justify-center rounded-xl bg-white cursor-pointer "
            onClick={onClick}
        >
            <div className="flex gap-5 items-center">
                <Plus size={30} />
                <div className="text-[20px]">Create Chatroom</div>
            </div>
        </div>
    );
};

export default CreateChatroomButton;
