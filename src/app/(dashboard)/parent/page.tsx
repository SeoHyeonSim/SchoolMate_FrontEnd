import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import EventCalander from "@/components/EventCalander";
import React from "react";

const ParentPage = () => {
    return (
        <div className="flex-1 p-4 flex gap-4 flex-col md:flex-row">
            {/* left */}
            <div className="w-full xl:w-2/3">
                <h1 className="text-xl font-semibold ">Schedule (Jane Doe) </h1>

                <BigCalendar />
            </div>
            {/* rigth */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                <EventCalander />
                <Announcements />
            </div>
        </div>
    );
};

export default ParentPage;
