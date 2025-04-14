import React from "react";

interface EventTileProps {
    title: string;
    startTime: string;
    endTime: string;
    className: string;
}

const EventTile = ({
    title,
    startTime,
    endTime,
    className,
}: EventTileProps) => {
    return (
        <div className="p-3 border rounded-lg shadow-sm bg-gray-100">
            <div className="text-sm font-semibold text-gray-800">{title}</div>

            <div className="text-sm font-semibold text-gray-800">
                {startTime}
            </div>

            <div className="text-sm font-semibold text-gray-800">{endTime}</div>

            <div className="text-sm font-semibold text-gray-800">
                {className}
            </div>
        </div>
    );
};

export default EventTile;
