import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { UserType } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const rooms = await prisma.videoChatRoom.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(rooms, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch video chat rooms:", error);
        return NextResponse.json(
            { error: "Failed to fetch video chat rooms" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    console.log("requesting create video chatroom..");
    try {
        const body = await req.json();
        const { name, createdById, invitedUserIds } = body;

        if (!createdById) {
            return NextResponse.json(
                { error: "CreatedById are required" },
                { status: 400 }
            );
        }

        // 8시간 후 만료 시간 설정
        const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);

        const videoChatRoom = await prisma.videoChatRoom.create({
            data: {
                name,
                createdById,
                expiresAt,
                isActive: true,
            },
        });

        if (!name?.trim()) {
            await prisma.videoChatRoom.update({
                where: { id: videoChatRoom.id },
                data: { name: videoChatRoom.id },
            });
        }

        // 초대된 사용자 추가
        if (invitedUserIds?.length) {
            const participants = await Promise.all(
                invitedUserIds.map(async (userId: string) => {
                    // 유저 타입 조회
                    const user =
                        (await prisma.admin.findUnique({
                            where: { id: userId },
                            select: { id: true, username: true },
                        })) ||
                        (await prisma.student.findUnique({
                            where: { id: userId },
                            select: { id: true, username: true },
                        })) ||
                        (await prisma.teacher.findUnique({
                            where: { id: userId },
                            select: { id: true, username: true },
                        })) ||
                        (await prisma.parent.findUnique({
                            where: { id: userId },
                            select: { id: true, username: true },
                        }));

                    if (!user) {
                        throw new Error(`User with ID ${userId} not found`);
                    }

                    // userType 추출
                    const userType = (await prisma.admin.findUnique({
                        where: { id: userId },
                    }))
                        ? UserType.ADMIN
                        : (await prisma.student.findUnique({
                              where: { id: userId },
                          }))
                        ? UserType.STUDENT
                        : (await prisma.teacher.findUnique({
                              where: { id: userId },
                          }))
                        ? UserType.TEACHER
                        : UserType.PARENT;

                    return {
                        videoChatRoomId: videoChatRoom.id,
                        userId,
                        userType,
                    };
                })
            );

            await prisma.videoChatParticipant.createMany({
                data: participants,
            });
        }

        return NextResponse.json(videoChatRoom, { status: 201 });
    } catch (error) {
        console.error("Failed to create video chat room:", error);
        return NextResponse.json(
            { error: "Failed to create video chat room" },
            { status: 500 }
        );
    }
}
