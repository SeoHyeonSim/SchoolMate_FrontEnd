"use client";

import { MessageCircleMore, Video } from "lucide-react";
import Link from "next/link";

import React from "react";

const MessagesListPage = () => {
    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">
                    Chatrooms
                </h1>
            </div>
            <div className="pt-4 gap-2 w-full">
                <div className=" flex flex-col gap-5 w-full">
                    <Link href={`/list/chatrooms/videochat`} className="flex-1">
                        <div className="rounded-2xl bg-green-400 hover:bg-green-300 h-[160px] px-4 py-3 flex flex-col  justify-between overflow-hidden ">
                            <div className=" text-white text-[25px] justify-start ">
                                Video Chatroom
                            </div>
                            <div className="flex justify-end relative -translate-y-4 ">
                                <Video size={150} color="white" />
                            </div>
                        </div>
                    </Link>

                    <Link href={`/list/chatrooms/classchat`} className="flex-1">
                        <div className="rounded-2xl bg-blue-400 hover:bg-blue-300 h-[160px] px-4 py-3 flex flex-col  justify-between overflow-hidden">
                            <div className=" text-white text-[25px] justify-start ">
                                Class Chatroom
                            </div>
                            <div className="flex justify-end relative -translate-y-4 ">
                                <MessageCircleMore size={120} color="white" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MessagesListPage;
