import Image from "next/image";
import "react-calendar/dist/Calendar.css";
import EventCalander from "./EventCalander";
import EventList from "./EventList";

const EventCalandarContainer = ({
    searchParams,
}: {
    searchParams: { [keys: string]: string | undefined };
}) => {
    const { date } = searchParams;

    return (
        <div className="bg-white p-4 rounded-md">
            <EventCalander />
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold my-4">Events</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20} />
            </div>
            <div className="flex flex-col gap-4">
                <EventList dateParam={date} />
            </div>
        </div>
    );
};

export default EventCalandarContainer;
