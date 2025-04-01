import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
    req: NextRequest,
    { params }: { params: { videochatId: string } }
) {
    const { videochatId } = params;

    try {
        const participants = await prisma.videoChatParticipant.findMany({
            where: { videoChatRoomId: videochatId },
            select: {
                id: true,
                userId: true,
                userType: true,
            },
        });

        return NextResponse.json(participants, { status: 200 });
    } catch (error) {
        console.error("Error fetching participants:", error);
        return NextResponse.json(
            { error: "Failed to fetch participants" },
            { status: 500 }
        );
    }
}
