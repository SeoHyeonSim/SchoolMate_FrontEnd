import React from "react";

interface AssignmentTileProps {
    title: string;
    dueDate: string;
    lessonName: string;
    subjectName: string;
    className: string;
    teacherName: string;
}

const AssignmentTile = ({
    title,
    dueDate,
    lessonName,
    subjectName,
    className,
    teacherName
}: AssignmentTileProps) => {
    return (
        <div className="p-3 border rounded-lg shadow-sm bg-gray-100">
            <div className="text-sm font-semibold text-gray-800">{title}</div>

            <div className="text-sm font-semibold text-gray-800">{dueDate}</div>

            <div className="text-sm font-semibold text-gray-800">
                {lessonName}
            </div>
            <div className="text-sm font-semibold text-gray-800">
                {subjectName}
            </div>
            <div className="text-sm font-semibold text-gray-800">
                {className}
            </div>
            <div className="text-sm font-semibold text-gray-800">
                {teacherName}
            </div>
        </div>
    );
};

export default AssignmentTile;
