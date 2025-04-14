import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export const dynamic = "force-dynamic";

// 특정 채팅방 정보 조회 (GET 요청)
export async function GET(
    req: Request,
    { params }: { params: { chatroomId: string } }
) {
    try {
        const chatroom = await prisma.chatRoom.findUnique({
            where: { id: params.chatroomId },
        });

        if (!chatroom) {
            return NextResponse.json(
                { error: "채팅방을 찾을 수 없습니다." },
                { status: 404 }
            );
        }

        return NextResponse.json(chatroom, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "채팅방 정보를 불러올 수 없습니다." },
            { status: 500 }
        );
    }
}
