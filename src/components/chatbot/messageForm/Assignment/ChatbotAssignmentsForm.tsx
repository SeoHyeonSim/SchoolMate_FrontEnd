import React from "react";
import AssignmentTile from "./AssignmentTile";

interface ChatbotAssignmentFormProps {
    assignmentList: {
        id: number;
        title: string;
        dueDate: string;
        lessonName: string;
        subjectName: string;
        className: string;
        teacherName: string;
    }[];
}

const ChatbotAssignmentForm = ({ assignmentList }: ChatbotAssignmentFormProps) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-purple-700">
                다가오는 과제 목록
            </h3>
            {assignmentList.map((assignment) => (
                <AssignmentTile
                    key={assignment.id}
                    title={assignment.title}
                    dueDate={assignment.dueDate}
                    lessonName={assignment.lessonName}
                    subjectName={assignment.subjectName}
                    className={assignment.className}
                    teacherName={assignment.teacherName}
                />
            ))}
        </div>
    );
};

export default ChatbotAssignmentForm;
