import Announcements from "@/components/dashboard/Announcements";
import BigCalenderContainer from "@/components/shared/BigCalenderContainer";
import EventCalandarContainer from "@/components/dashboard/EventCalendarContainer";
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
