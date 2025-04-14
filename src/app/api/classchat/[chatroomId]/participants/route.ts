import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export const dynamic = "force-dynamic";

// 특정 채팅방의 참여자 목록 조회 
export async function GET(
    req: Request,
    { params }: { params: { chatroomId: string } }
) {
    try {
        const participants = await prisma.chatParticipant.findMany({
            where: { chatRoomId: params.chatroomId },
        });

        return NextResponse.json(participants, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "참여자 목록을 불러올 수 없습니다." },
            { status: 500 }
        );
    }
}
