import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb"; 
import { UserType } from "@prisma/client";

// 채팅방 목록 불러오기
export async function GET() {
    try {
        console.log("Fetching chatrooms...");

        const chatrooms = await prisma.chatRoom.findMany({});
        console.log("Chatrooms fetched:", chatrooms);

        return NextResponse.json(chatrooms);
    } catch (error: any) {
        console.error("채팅방 목록 불러오기 실패:", error.message, error.stack);
        return NextResponse.json(
            {
                error: "채팅방 목록을 불러오는 중 오류 발생",
                details: error.message,
            },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, createdById } = await req.json();

        if (!name || !createdById) {
            return NextResponse.json(
                { error: "Invalid input" },
                { status: 400 }
            );
        }

        const chatRoom = await prisma.chatRoom.create({
            data: {
                name,
                createdById,
            },
        });

        let userType: UserType | undefined = undefined;

        const user = await prisma.$transaction([
            prisma.admin.findUnique({ where: { id: createdById } }),
            prisma.student.findUnique({ where: { id: createdById } }),
            prisma.teacher.findUnique({ where: { id: createdById } }),
            prisma.parent.findUnique({ where: { id: createdById } }),
        ]);

        const [admin, student, teacher, parent] = user;

        if (admin) userType = UserType.ADMIN;
        else if (student) userType = UserType.STUDENT;
        else if (teacher) userType = UserType.TEACHER;
        else if (parent) userType = UserType.PARENT;

        if (!userType) {
            console.error("사용자 유형을 찾을 수 없음:", createdById);
            return NextResponse.json(
                { error: "Invalid user type" },
                { status: 400 }
            );
        }

        const chatParticipant = await prisma.chatParticipant.create({
            data: {
                chatRoomId: chatRoom.id,
                userId: createdById,
                userType: userType,
            },
        });

        console.log("chatroom created successfully!");

        return NextResponse.json(
            { chatRoom, chatParticipant },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "채팅방 생성 중 오류 발생" },
            { status: 500 }
        );
    }
}
