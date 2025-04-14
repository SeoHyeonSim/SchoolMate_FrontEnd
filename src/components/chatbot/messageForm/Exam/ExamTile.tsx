import React from "react";

interface ExamTileProps {
    title: string;
    startTime: string;
    endTime: string;
    lessonName: string;
    subjectName: string;
    className: string;
    teacherName: string;
}

const ExamTile = ({
    title,
    startTime,
    endTime,
    lessonName,
    subjectName,
    className,
    teacherName,
}: ExamTileProps) => {
    return (
        <div className="p-3 border rounded-lg shadow-sm bg-gray-100">
            <div className="text-sm font-semibold text-gray-800">{title}</div>
            <div className="text-sm font-semibold text-gray-800">
                {startTime}
            </div>

            <div className="text-sm font-semibold text-gray-800">{endTime}</div>

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

export default ExamTile;
