import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    console.log("getting messages from messages/route.ts");
    const { userId } = await auth();

    console.log(`this is user id : ${userId}`);

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const messages = await prisma.chatbotMessage.findMany({
            where: {
                userId,
            },
            orderBy: { createdAt: "asc" },
        });

        return NextResponse.json({ messages });
    } catch (error) {
        console.error("Failed to fetch messages:", error);
        return NextResponse.json(
            { error: "Failed to fetch messages" },
            { status: 500 }
        );
    }
}
