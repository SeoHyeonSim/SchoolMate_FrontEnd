import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { UserType } from "@prisma/client";

export const dynamic = "force-dynamic";

//POST 요청 핸들러
export async function POST(
    req: Request,
    { params }: { params: { chatroomId: string } }
) {
    try {
        const { chatroomId } = params; //URL에서 chatroomId 추출
        const { userIds } = await req.json(); //body에서 userIds 배열 추출

        if (!chatroomId || !userIds || !Array.isArray(userIds)) {
            return NextResponse.json(
                { error: "잘못된 요청: chatroomId 또는 userIds가 없음" },
                { status: 400 }
            );
        }

        //초대할 유저들의 타입을 데이터베이스에서 가져오기
        const users = await prisma.$transaction([
            prisma.admin.findMany({
                where: { id: { in: userIds } },
                select: { id: true, username: true },
            }),
            prisma.student.findMany({
                where: { id: { in: userIds } },
                select: { id: true, username: true },
            }),
            prisma.teacher.findMany({
                where: { id: { in: userIds } },
                select: { id: true, username: true },
            }),
            prisma.parent.findMany({
                where: { id: { in: userIds } },
                select: { id: true, username: true },
            }),
        ]);

        //userType을 자동으로 설정
        const [admins, students, teachers, parents] = users;
        const allUsers = [
            ...admins.map((user) => ({
                id: user.id,
                userType: UserType.ADMIN,
            })),
            ...students.map((user) => ({
                id: user.id,
                userType: UserType.STUDENT,
            })),
            ...teachers.map((user) => ({
                id: user.id,
                userType: UserType.TEACHER,
            })),
            ...parents.map((user) => ({
                id: user.id,
                userType: UserType.PARENT,
            })),
        ];

        // 데이터베이스에 새로운 참가자 추가
        const newParticipants = await prisma.chatParticipant.createMany({
            data: allUsers.map((user) => ({
                chatRoomId: chatroomId,
                userId: user.id,
                userType: user.userType,
            })),
            skipDuplicates: true, // 중복 방지
        });

        console.log("초대 완료:", newParticipants);

        return NextResponse.json(
            { success: true, newParticipants },
            { status: 200 }
        );
    } catch (error) {
        console.error("초대 중 오류 발생:", error);
        return NextResponse.json(
            { error: "초대 중 오류 발생" },
            { status: 500 }
        );
    }
}
