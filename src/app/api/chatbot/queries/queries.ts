import prisma from "@/lib/prismadb";
import {
    AssignmentData,
    ChatbotResponseType,
    EventData,
    ExamData,
    LessonData,
} from "@/app/types/types";

// 오늘의 급식 조회 함수
export async function getTodayMeal() {
    const today = new Date().toISOString().split("T")[0];

    const todayMenu = await prisma.menu.findFirst({
        where: { date: new Date(today) },
    });

    if (!todayMenu) {
        return {
            reply: null,
            type: ChatbotResponseType.TODAY_MENU,
        };
    }

    return {
        reply: todayMenu,
        type: ChatbotResponseType.TODAY_MENU,
    };
}

// 이번 주 급식 조회 함수
export async function getWeekMeal() {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const weekMenus = await prisma.menu.findMany({
        where: {
            date: { gte: startOfWeek, lte: endOfWeek },
        },
    });

    if (weekMenus.length === 0) {
        return { reply: [] };
    }

    return { reply: weekMenus, type: ChatbotResponseType.WEEK_MENU };
}

// 다가오는 과제 조회
export async function getUpcomingAssignments() {
    console.log("다가오는 과제");
    const now = new Date();
    const oneWeekLater = new Date(now);
    oneWeekLater.setDate(now.getDate() + 14);

    const upcomingAssignments = await prisma.assignment.findMany({
        where: {
            dueDate: {
                gte: now,
                lte: oneWeekLater,
            },
        },
        select: {
            id: true,
            title: true,
            startDate: true,
            dueDate: true,
            lesson: {
                select: {
                    name: true,
                    subject: {
                        select: {
                            name: true,
                        },
                    },
                    class: {
                        select: {
                            name: true,
                        },
                    },
                    teacher: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });

    const formattedUpcomingAssignments = upcomingAssignments.map(
        (assignment: AssignmentData) => ({
            id: assignment.id,
            title: assignment.title,
            startDate: new Date(assignment.startDate).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            }),
            dueDate: new Date(assignment.dueDate).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            }),
            lessonName: assignment.lesson?.name || "-",
            subjectName: assignment.lesson?.subject?.name || "-",
            className: assignment.lesson?.class?.name || "-",
            teacherName: assignment.lesson?.teacher?.name || "-",
        })
    );

    return {
        reply: formattedUpcomingAssignments,
        type: ChatbotResponseType.UPCOMING_ASSIGNMENT,
    };
}

// 다가오는 시험 조회
export async function getUpcomingExams() {
    const now = new Date();
    const nextWeek = new Date(now);
    nextWeek.setDate(now.getDate() + 14);

    const upcomingExams = await prisma.exam.findMany({
        where: {
            startTime: {
                gte: now,
                lte: nextWeek,
            },
        },
        select: {
            id: true,
            title: true,
            startTime: true,
            endTime: true,
            lesson: {
                select: {
                    name: true,
                    subject: {
                        select: {
                            name: true,
                        },
                    },
                    class: {
                        select: {
                            name: true,
                        },
                    },
                    teacher: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });

    console.log(upcomingExams);

    const formattedUpcomingExams = upcomingExams.map((exam: ExamData) => ({
        id: exam.id,
        title: exam.title,
        startTime: new Date(exam.startTime).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }),
        endTime: new Date(exam.endTime).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }),
        lessonName: exam.lesson?.name || "-",
        subjectName: exam.lesson?.subject?.name || "-",
        className: exam.lesson?.class?.name || "-",
        teacherName: exam.lesson?.teacher?.name || "-",
    }));

    return {
        reply: formattedUpcomingExams,
        type: ChatbotResponseType.UPCOMING_EXAM,
    };
}

// 다가오는 행사 조회
export async function getUpcomingEvents() {
    console.log("다가오는 행사");
    const now = new Date();
    const oneWeekLater = new Date(now);
    oneWeekLater.setDate(now.getDate() + 7);

    const upcomingEvents = await prisma.event.findMany({
        where: {
            startTime: {
                gte: now,
                lte: oneWeekLater,
            },
        },
        select: {
            id: true,
            title: true,
            startTime: true,
            endTime: true,
            class: {
                select: {
                    name: true,
                },
            },
        },
    });

    const formattedUpcomingEvents = upcomingEvents.map((event: EventData) => ({
        id: event.id,
        title: event.title,
        startTime: new Date(event.startTime).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }),
        endTime: new Date(event.endTime).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }),
        className: event.class?.name ?? "-",
    }));

    console.log(formattedUpcomingEvents);

    return {
        reply: formattedUpcomingEvents,
        type: ChatbotResponseType.UPCOMING_EVENT,
    };
}

export async function getLessonNames() {
    const lessons = await prisma.lesson.findMany({
        select: {
            id: true,
            name: true,
        },
    });

    return lessons.map((lesson: LessonData) => ({
        id: lesson.id,
        name: lesson.name,
    }));
}

export async function getAssignmentsByLessons(lessonId: number) {
    const assignments = await prisma.assignment.findMany({
        where: {
            lessonId: lessonId,
        },
        select: {
            id: true,
            title: true,
            startDate: true,
            dueDate: true,
            lesson: {
                select: {
                    name: true,
                    subject: {
                        select: {
                            name: true,
                        },
                    },
                    class: {
                        select: {
                            name: true,
                        },
                    },
                    teacher: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });

    const formattedAssignments = assignments.map(
        (assignment: AssignmentData) => ({
            id: assignment.id,
            title: assignment.title,
            startTime: new Date(assignment.startDate).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            }),
            endTime: new Date(assignment.dueDate).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            }),
            lessonName: assignment.lesson?.name || "-",
            subjectName: assignment.lesson?.subject?.name || "-",
            className: assignment.lesson?.class?.name || "-",
            teacherName: assignment.lesson?.teacher?.name || "-",
        })
    );

    return {
        reply: formattedAssignments,
        type: ChatbotResponseType.ASSIGNMENT_BY_LESSONS,
    };
}

export async function getExamsByLessons(lessonId: number) {
    const exams = await prisma.exam.findMany({
        where: {
            lessonId: lessonId,
        },
        select: {
            id: true,
            title: true,
            startTime: true,
            endTime: true,
            lesson: {
                select: {
                    name: true,
                    subject: {
                        select: {
                            name: true,
                        },
                    },
                    class: {
                        select: {
                            name: true,
                        },
                    },
                    teacher: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });

    const formattedExams = exams.map((exam: ExamData) => ({
        id: exam.id,
        title: exam.title,
        startTime: new Date(exam.startTime).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }),
        endTime: new Date(exam.endTime).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }),
        lessonName: exam.lesson?.name || "-",
        subjectName: exam.lesson?.subject?.name || "-",
        className: exam.lesson?.class?.name || "-",
        teacherName: exam.lesson?.teacher?.name || "-",
    }));

    return {
        reply: formattedExams,
        type: ChatbotResponseType.EXAM_BY_LESSONS,
    };
}
