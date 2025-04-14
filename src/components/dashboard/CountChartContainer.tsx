import prisma from "@/lib/prismadb";
import Image from "next/image";
import CountChart from "./CountChart";

const CountChartContainer = async () => {
    const data = await prisma.student.groupBy({
        by: ["sex"],
        _count: true,
    });

    const boys = data.find((d: any) => d.sex === "MALE")?._count || 0;
    const girls = data.find((d: any) => d.sex === "FEMALE")?._count || 0;

    return (
        <div className="bg-white rounded-xl w-full h-full px-4 py-7">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Students</h1>
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
            <CountChart boys={boys} girls={girls} />

            {/* bottom */}
            <div className="flex justify-center gap-16">
                <div className="flex flex-col gap-1">
                    <div className="w-5 h-5 bg-lamaSky rounded-full" />
                    <h1 className="font-bold">{boys}</h1>
                    <h2 className="text-[13px] text-gray-400">
                        {" "}
                        Boys ({Math.round((boys / (boys + girls)) * 100)}%)
                    </h2>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="w-5 h-5 bg-[#ffaae0] rounded-full" />
                    <h1 className="font-bold">{girls}</h1>
                    <h2 className="text-[13px] text-gray-400">
                        {" "}
                        Girls ({Math.round((girls / (boys + girls)) * 100)}%)
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default CountChartContainer;
