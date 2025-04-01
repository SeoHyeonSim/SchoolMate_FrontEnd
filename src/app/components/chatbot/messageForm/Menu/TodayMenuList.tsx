import { Menu } from "@prisma/client";
import React from "react";
import MenuTile from "./MenuTile";

interface TodayMenuListProps {
    id: number;
    day: string;
    date: string;
    menu: string[];
    description?: string;
}

const TodayMenuList = ({
    id,
    day,
    date,
    menu,
    description,
}: TodayMenuListProps) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-purple-700">오늘의 메뉴!</h3>

            <MenuTile
                key={id}
                day={day}
                date={date}
                menu={menu}
                description={description}
            />
        </div>
    );
};

export default TodayMenuList;
