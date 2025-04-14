import { UserType } from "@prisma/client";

export interface User {
    id: string;
    username: string;
    userType: UserType;
}

export enum Reaction {
    WAVE = "wave",
    THUMBS_UP = "thumbs-up",
    LAUGH = "laugh",
    HEART = "heart",
    SMILE = "smile",
}

export interface ChatbotButtonProps {
    label: string;
    value: string;
}

export const initialButtons: ChatbotButtonProps[] = [
    { label: "과제와 시험", value: "과제와 시험" },
    { label: "급식", value: "급식" },
    { label: "행사", value: "행사" },
];

export const assignmentButtons: ChatbotButtonProps[] = [
    { label: "과제", value: "과제" },
    { label: "시험", value: "시험" },
];

export const assignmentFilterButtons: ChatbotButtonProps[] = [
    { label: "다가오는 과제", value: "다가오는 과제" },
    { label: "과목별 과제", value: "과목별 과제" },
];

export const examFilterButtons: ChatbotButtonProps[] = [
    { label: "다가오는 시험", value: "다가오는 시험" },
    { label: "과목별 시험", value: "과목별 시험" },
];

export const mealButtons: ChatbotButtonProps[] = [
    { label: "오늘의 급식", value: "오늘의 급식" },
    { label: "이번주 급식", value: "이번주 급식" },
];

export const toFirstPageButton: ChatbotButtonProps = {
    label: "처음으로",
    value: "처음으로",
};

export enum ChatbotResponseType {
    WEEK_MENU,
    TODAY_MENU,
    UPCOMING_EXAM,
    EXAM_BY_LESSONS,
    UPCOMING_ASSIGNMENT,
    ASSIGNMENT_BY_LESSONS,
    UPCOMING_EVENT,
}

export interface LessonData {
    id: number;
    name: string;
}

export interface LessonDetailData {
    name: string;
    subject: {
        name: string;
    };
    class: {
        name: string;
    };
    teacher: {
        name: string;
    };
}

export interface AssignmentData {
    id: number;
    title: string;
    startDate: Date;
    dueDate: Date;
    lesson: LessonDetailData;
}

export interface ExamData {
    id: number;
    title: string;
    startTime: Date;
    endTime: Date;
    lesson: LessonDetailData;
}

export interface EventData {
    id: number;
    title: string;
    startTime: Date;
    endTime: Date;
    class: {
        name: string;
    } | null;
}

export const userTypeColors: Record<UserType, string> = {
    TEACHER: "bg-yellow-400",
    STUDENT: "bg-blue-400",
    ADMIN: "bg-red-400",
    PARENT: "bg-green-400",
};

