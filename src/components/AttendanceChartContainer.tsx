import Image from "next/image";
import React from "react";
import prisma from "@/lib/prismadb";
import AttendanceChart from "./AttendanceChart";

const AttendanceChartContainer = async () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const lastMonday = new Date(today);

    lastMonday.setDate(today.getDate() - daysSinceMonday);

    const resData = await prisma.attendance.findMany({
        where: {
            date: {
                gte: lastMonday,
            },
        },
        select: {
            date: true,
            present: true,
        },
    });

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

    const attendanceMap: {
        [key: string]: { present: number; absent: number };
    } = {
        Mon: { present: 0, absent: 0 },
        Tue: { present: 0, absent: 0 },
        Wed: { present: 0, absent: 0 },
        Thu: { present: 0, absent: 0 },
        Fri: { present: 0, absent: 0 },
    };

    resData.forEach((item: any) => {
        const itemDate = new Date(item.date);
        const dayOfWeek = itemDate.getDay();

        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            const dayName = daysOfWeek[dayOfWeek - 1];

            if (item.present) {
                attendanceMap[dayName].present += 1;
            } else {
                attendanceMap[dayName].absent += 1;
            }
        }
    });

    const data = daysOfWeek.map((day) => ({
        name: day,
        present: attendanceMap[day].present,
        absent: attendanceMap[day].absent,
    }));

    return (
        <div className="bg-white rounded-xl h-full w-full px-4 py-7">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Attendence</h1>
                <div className="hover:cursor-pointer">
                    <Image
                        src="/moreDark.png"
                        width={24}
                        height={24}
                        alt={""}
                    />
                </div>
            </div>
            {/* chart */}
            <AttendanceChart data={data} />
        </div>
    );
};

export default AttendanceChartContainer;
