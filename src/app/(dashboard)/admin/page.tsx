import Announcements from "@/components/dashboard/Announcements";
import AttendanceChartContainer from "@/components/dashboard/AttendanceChartContainer";
import CountChartContainer from "@/components/dashboard/CountChartContainer";
import EventCalandarContainer from "@/components/dashboard/EventCalendarContainer";
import FinanceChart from "@/components/dashboard/FinanceChart";
import UserCard from "@/components/dashboard/UserCard";
import React from "react";

export const dynamic = "force-dynamic";

const AdminPage = ({
    searchParams,
}: {
    searchParams: { [keys: string]: string | undefined };
}) => {
    return (
        <div className="p-4 flex gap-4 flex-col md:flex-row">
            {/* left */}
            <div className="w-full h-full lg:w-2/3 flex flex-col gap-8">
                {/* user cards */}
                <div className="flex gap-4 justify-between flex-wrap">
                    <UserCard type="student" />
                    <UserCard type="teacher" />
                    <UserCard type="parent" />
                    <UserCard type="admin" />
                </div>
                {/* middle charts */}
                <div className="flex gap-4 flex-col lg:flex-row">
                    {/* count chart */}
                    <div className="w-full lg:w-1/3 h-[450px]">
                        <CountChartContainer />

                        {/* <CountChart /> */}
                    </div>
                    {/* attendance chart */}
                    <div className="w-full lg:w-2/3 h-[450px]">
                        <AttendanceChartContainer />
                    </div>
                </div>
                {/* bottom chart */}
                <div className="w-full h-[450px]">
                    <FinanceChart />
                </div>
            </div>
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
                <EventCalandarContainer searchParams={searchParams} />
                <Announcements />
            </div>
        </div>
    );
};

export default AdminPage;
