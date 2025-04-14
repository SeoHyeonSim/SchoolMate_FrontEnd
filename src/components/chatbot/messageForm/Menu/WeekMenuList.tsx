import React from "react";
import MenuTile from "./MenuTile";

interface WeekMenuListProps {
    menuList: {
        id: number;
        day: string;
        date: string;
        menu: string[];
        description?: string;
    }[];
}

const WeekMenuList = ({ menuList }: WeekMenuListProps) => {
    if (menuList.length === 0) {
        return <p className="text-gray-500">이번 주 급식 정보가 없습니다.</p>;
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-purple-700">
                이번 주 급식 일정!
            </h3>
            {menuList.map((meal) => (
                <MenuTile
                    key={meal.id}
                    day={meal.day}
                    date={meal.date}
                    menu={meal.menu}
                    description={meal.description}
                />
            ))}
        </div>
    );
};

export default WeekMenuList;
