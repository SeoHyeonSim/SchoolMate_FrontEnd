"use client";

import React, { useState } from "react";
import ChatBotIcon from "./ChatBotIcon";

const ChatbotComponent = () => {
    return (
        <div className="absolute z-50">
            <div>
                <ChatBotIcon />
            </div>
        </div>
    );
};

export default ChatbotComponent;
