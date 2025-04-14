import Image from "next/image";
import React from "react";

import prisma from "@/lib/prismadb";

const UserCard = async ({
    type,
}: {
    type: "admin" | "teacher" | "student" | "parent";
}) => {
    const modelMap: Record<typeof type, any> = {
        admin: prisma.admin,
        teacher: prisma.teacher,
        student: prisma.student,
        parent: prisma.parent,
    };

    const data = await modelMap[type].count()


    return (
        <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow flex-1 min-w-[130px] px-4 py-3">
            <div className="flex justify-between items-center">
                <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
                    2024/25
                </span>
                <div className="hover:cursor-pointer">
                    <Image alt="" src="/more.png" width={22} height={20} />
                </div>
            </div>
            <h1 className="text-2xl font-semibold my-4">{data}</h1>
            <h2 className="capitalize text-sm font-medium text-gray-500">
                {type}s
            </h2>
        </div>
    );
};

export default UserCard;
