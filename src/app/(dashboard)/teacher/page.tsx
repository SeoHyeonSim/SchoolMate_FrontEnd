import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import EventCalandarContainer from "@/components/EventCalendarContainer";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const TeacherPage = async ({
    searchParams,
}: {
    searchParams: { [keys: string]: string | undefined };
}) => {
    const { userId } = await auth();

    return (
        <div className=" flex-1 p-4 flex gap-4 flex-col md:flex-row">
            {/* left */}
            <div className="w-full xl:w-2/3">
                <BigCalenderContainer type={"teacherId"} id={userId!} />
            </div>
            {/* rigth */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                <EventCalandarContainer searchParams={searchParams} />
                <Announcements />
            </div>
        </div>
    );
};

export default TeacherPage;
