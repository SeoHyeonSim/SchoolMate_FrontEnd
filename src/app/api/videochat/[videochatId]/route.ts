import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
    req: NextRequest,
    { params }: { params: { videochatId: string } }
) {
    const { videochatId } = params;

    try {
        const chatroom = await prisma.videoChatRoom.findUnique({
            where: { id: videochatId },
        });

        if (!chatroom) {
            return NextResponse.json(
                { error: "Chatroom not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(chatroom, { status: 200 });
    } catch (error) {
        console.error("Error fetching chatroom:", error);
        return NextResponse.json(
            { error: "Failed to fetch chatroom" },
            { status: 500 }
        );
    }
}
