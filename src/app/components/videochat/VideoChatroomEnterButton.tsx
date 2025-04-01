import React from "react";

const VideoChatroomEnterButton = () => {
    var isActive = false;

    return (
        <button
            className={`w-[50px] h-[30px] flex items-center justify-center rounded-sm ${
                isActive ? "bg-green-400" : "bg-gray-400"
            }`}
        >
            <div className="text-[12px]">Enter</div>
        </button>
    );
};

export default VideoChatroomEnterButton;
