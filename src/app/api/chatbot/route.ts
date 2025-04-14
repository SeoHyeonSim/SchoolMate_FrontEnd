import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import {
    getAssignmentsByLessons,
    getExamsByLessons,
    getLessonNames,
    getTodayMeal,
    getUpcomingAssignments,
    getUpcomingEvents,
    getUpcomingExams,
    getWeekMeal,
} from "./queries/queries";
import { LessonData } from "@/app/types/types";

export const dynamic = "force-dynamic";

export interface ApiResponse {
    reply: string | object;
}

let currentMode: "assignment" | "exam" | null = null;
let lessonMap: Record<string, number> = {};

export async function POST(req: NextRequest) {
    const { userId } = await auth();
    if (!userId)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { message } = body;
    if (!message)
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });

    try {
        // 메시지 처리 함수 호출
        const response = await handleMessage(userId, message);
        return NextResponse.json(response);
    } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
        return NextResponse.json(
            { error: "서버와의 통신에 실패했습니다." },
            { status: 500 }
        );
    }
}

// 메시지 처리 함수
async function handleMessage(userId: string, message: string) {
    switch (message) {
        // 다가오는 과제
        case "다가오는 과제":
            return await getUpcomingAssignments();

        // 다가오는 시험
        case "다가오는 시험":
            return await getUpcomingExams();

        // 다가오는 행사
        case "행사":
            return await getUpcomingEvents();

        // 급식
        case "오늘의 급식":
            return await getTodayMeal();
        case "이번주 급식":
            return await getWeekMeal();

        case "처음으로":
            return { reply: "무엇을 도와드릴까요?" };

        // **과목별 과제 조회**
        case "과목별 과제": {
            currentMode = "assignment";
            const lessons = await getLessonNames();
            lessonMap = lessons.reduce(
                (map: { [x: string]: any }, lesson: LessonData) => {
                    map[lesson.name] = lesson.id;
                    return map;
                },
                {} as Record<string, number>
            );

            return {
                reply: "어떤 과목으로 조회할까요?",
                buttons: lessons.map((lesson: LessonData) => ({
                    label: lesson.name,
                    value: lesson.name,
                })),
            };
        }

        // 과목별 시험 조회
        case "과목별 시험": {
            currentMode = "exam";
            const lessons = await getLessonNames();
            lessonMap = lessons.reduce(
                (
                    map: { [x: string]: any },
                    lesson: { name: string | number; id: any }
                ) => {
                    map[lesson.name] = lesson.id;
                    return map;
                },
                {} as Record<string, number>
            );

            return {
                reply: "어떤 과목으로 조회할까요?",
                buttons: lessons.map((lesson: { name: any }) => ({
                    label: lesson.name,
                    value: lesson.name,
                })),
            };
        }

        default:
            // 과목 선택 후 과제/시험 조회 처리
            if (lessonMap[message]) {
                const lessonId = lessonMap[message];

                if (currentMode === "assignment") {
                    const assignments = await getAssignmentsByLessons(lessonId);
                    return assignments;
                } else if (currentMode === "exam") {
                    const exams = await getExamsByLessons(lessonId);
                    return exams;
                }
            }

            return { reply: "알 수 없는 입력입니다." };
    }
}
