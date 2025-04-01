import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { Message } from "@prisma/client";

// 🔹 특정 채팅방의 메시지 목록 조회 (GET 요청)
export async function GET(
    req: Request,
    { params }: { params: { chatroomId: string } }
) {
    try {
        const messages = await prisma.message.findMany({
            where: { chatRoomId: params.chatroomId },
            orderBy: { createdAt: "asc" },
            include: {
                chatRoom: true, // 채팅방 정보 포함
            },
        });
        console.log("get message");

        // 메시지와 함께 senderId로 보낸 사람의 이름을 포함시켜줌
        const messagesWithSenderName = await Promise.all(
            messages.map(async (message: Message) => {
                let senderName = "Unknown";
                const sender =
                    (await prisma.student.findUnique({
                        where: { id: message.senderId },
                        select: { name: true },
                    })) ||
                    (await prisma.teacher.findUnique({
                        where: { id: message.senderId },
                        select: { name: true },
                    })) ||
                    (await prisma.parent.findUnique({
                        where: { id: message.senderId },
                        select: { name: true },
                    }));

                if (sender) {
                    senderName = sender.name;
                }

                return {
                    ...message,
                    senderName,
                };
            })
        );

        return NextResponse.json(messagesWithSenderName, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "메시지를 불러올 수 없습니다." },
            { status: 500 }
        );
    }
}

// 🔹 메시지 전송 (POST 요청)
export async function POST(
    req: Request,
    { params }: { params: { chatroomId: string } }
) {
    try {
        const { senderId, content } = await req.json();
        const newMessage = await prisma.message.create({
            data: { senderId, content, chatRoomId: params.chatroomId },
        });

        return NextResponse.json(newMessage, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "메시지 전송 실패" },
            { status: 500 }
        );
    }
}
