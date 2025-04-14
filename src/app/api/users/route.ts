import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { UserType } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET() {
    console.log("API 호출됨: /api/users");

    try {
        console.log("데이터베이스에서 유저 가져오는 중...");
        const admins = await prisma.admin.findMany({
            select: { id: true, username: true },
        });

        const students = await prisma.student.findMany({
            select: { id: true, username: true },
        });

        const teachers = await prisma.teacher.findMany({
            select: { id: true, username: true },
        });

        const parents = await prisma.parent.findMany({
            select: { id: true, username: true },
        });

        const userList = [
            ...admins.map((user) => ({ ...user, userType: UserType.ADMIN })),
            ...students.map((user) => ({
                ...user,
                userType: UserType.STUDENT,
            })),
            ...teachers.map((user) => ({
                ...user,
                userType: UserType.TEACHER,
            })),
            ...parents.map((user) => ({ ...user, userType: UserType.PARENT })),
        ];

        return NextResponse.json(userList, { status: 200 });
    } catch (error) {
        console.error("유저 목록 불러오기 오류:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
