import { Menu } from "@prisma/client";
import React, { useState } from "react";

interface DateMenuBlockProps {
    day?: number;
    menuForDay?: Menu;
}

const DateMenuBlock: React.FC<DateMenuBlockProps> = ({ day, menuForDay }) => {
    const [isHovered, setIsHovered] = useState(false);

    const displayMenus = menuForDay?.menu ? menuForDay.menu.slice(0, 2) : [];
    const isFullMenuDisplayed = displayMenus.length >= 2;
    const hasMenu = menuForDay?.menu.length > 0;

    return (
        <div
            className=" h-[150px] min-h-[100px] min-w-[100px] border-2 border-slate-300 rounded-md p-1 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="text-[14px] font-bold p-1">{day}</div>
            {hasMenu && (
                <div className="flex flex-col mt-1 text-sm">
                    {displayMenus.map((menuItem, index) => (
                        <div key={index} className="truncate">
                            {menuItem}
                        </div>
                    ))}
                    {isFullMenuDisplayed && (
                        <div className="text-gray-400">...</div>
                    )}
                </div>
            )}

            {/* 메뉴 전체 표시 툴팁 */}
            {hasMenu && isHovered && (
                <div
                    className="absolute z-20 mt-2 w-64 bg-white p-4 border border-gray-300 rounded shadow-lg"
                    style={{
                        top: "40%",
                        left: "10%",
                        transform: "translateX(-50%)",
                    }}
                >
                    <div>
                        {menuForDay?.description && (
                            <div className="text-[15px] text-green-500">
                                {menuForDay.description}
                            </div>
                        )}
                    </div>

                    <ul>
                        {menuForDay?.menu.map((item, index) => (
                            <li key={index} className="text-sm">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DateMenuBlock;
