import React from "react";
import BigCalendar from "./BigCalendar";
import prisma from "@/lib/prismadb";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

const BigCalenderContainer = async ({
    type,
    id,
}: {
    type: "teacherId" | "classId";
    id: string | number;
}) => {
    const dataRes = await prisma.lesson.findMany({
        where: {
            ...(type === "teacherId"
                ? { teacherId: id as string }
                : { classId: id as number }),
        },
    });

    const data = dataRes.map((lesson: any) => ({
        title: lesson.name,
        start: lesson.startTime,
        end: lesson.endTime,
    }));

    const schedule = adjustScheduleToCurrentWeek(data);

    return (
        <div>
            <BigCalendar data={schedule} />
        </div>
    );
};

export default BigCalenderContainer;
