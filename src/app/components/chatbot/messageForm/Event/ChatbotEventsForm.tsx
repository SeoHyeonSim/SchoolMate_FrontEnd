import React from "react";
import EventTile from "./EventTile";

interface ChatbotEventsFormProps {
    eventList: {
        id: number;
        title: string;
        startTime: string;
        endTime: string;
        className: string;
    }[];
}

const ChatbotEventsForm = ({ eventList }: ChatbotEventsFormProps) => {

    console.log(eventList)

    return (
        
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-purple-700">
                다가오는 행사 목록
            </h3>
            {eventList.map((event) => (
                <EventTile
                    key={event.id}
                    title={event.title}
                    startTime={event.startTime}
                    endTime={event.endTime}
                    className={event.className}
                />
            ))}
        </div>
    );
};

export default ChatbotEventsForm;
