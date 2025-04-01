import Announcements from "@/components/Announcements";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import { auth } from "@clerk/nextjs/server";
import "react-big-calendar/lib/css/react-big-calendar.css";
import prisma from "@/lib/prismadb";
import EventCalander from "@/components/EventCalander";

const StudentPage = async () => {
    const { userId } = await auth();

    const classItem = await prisma.class.findMany({
        where: {
            students: { some: { id: userId! } },
        },
    });

    return (
        <div className=" flex-1 p-4 flex gap-4 flex-col md:flex-row">
            {/* left */}
            <div className="w-full xl:w-2/3">
                <BigCalenderContainer type="classId" id={classItem[0].id} />
            </div>
            {/* right */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                <EventCalander/>
                <Announcements />
            </div>
        </div>
    );
};

export default StudentPage;
