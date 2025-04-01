import React from "react";
import ExamTile from "./ExamTile";

interface ChatbotExamsFormsProps {
    examList: {
        id: number;
        title: string;
        startTime: string;
        endTime: string;
        lessonName: string;
        subjectName: string;
        className: string;
        teacherName: string;
    }[];
}

const ChatbotExamsForms = ({ examList }: ChatbotExamsFormsProps) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-purple-700">
                다가오는 시험 목록
            </h3>
            {examList.map((assignment) => (
                <ExamTile
                    key={assignment.id}
                    title={assignment.title}
                    startTime={assignment.startTime}
                    endTime={assignment.endTime}
                    lessonName={assignment.lessonName}
                    subjectName={assignment.subjectName}
                    className={assignment.className}
                    teacherName={assignment.teacherName}
                />
            ))}
        </div>
    );
};

export default ChatbotExamsForms;
