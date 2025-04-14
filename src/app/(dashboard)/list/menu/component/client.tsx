"use client";

import { Menu } from "@prisma/client";
import React, { useState, useEffect } from "react";
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    addMonths,
    subMonths,
    getDay,
} from "date-fns";
import { ko } from "date-fns/locale";
import DateMenuBlock from "@/components/menu/DateMenuBlock";
import { ArrowLeft, ArrowRight } from "lucide-react";

const MenuClient = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [menus, setMenus] = useState<Menu[]>([]);

    const handlePrevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const fetchMenus = async () => {
        try {
            const res = await fetch("/api/menu");
            if (!res.ok) {
                throw new Error("Failed to fetch menu data");
            }
            const data = await res.json();
            setMenus(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    const getMonthMenu = () => {
        const start = startOfMonth(currentDate);
        const end = endOfMonth(currentDate);
        const daysInMonth = eachDayOfInterval({ start, end });

        return daysInMonth.map((day) => {
            const menuForDay = menus.find(
                (menu) =>
                    format(new Date(menu.date), "yyyy-MM-dd") ===
                    format(day, "yyyy-MM-dd")
            );
            return { day, menuForDay };
        });
    };

    const monthMenu = getMonthMenu();

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex justify-between items-center mb-4">
                <button
                    className="w-8 h-8 bg-blue-200 rounded-full flex flex-col  items-center justify-center text-white"
                    onClick={handlePrevMonth}
                >
                    <ArrowLeft size={20}/>
                </button>
                <span className="text-xl font-semibold">
                    {format(currentDate, "MMMM yyyy", { locale: ko })}
                </span>
                <button
                    className="w-8 h-8 bg-blue-200 rounded-full flex flex-col  items-center justify-center text-white"
                    onClick={handleNextMonth}
                >
                    <ArrowRight size={20}/>
                </button>
            </div>

            {/* 요일 표시 */}
            <div className="grid grid-cols-7 gap-1 mb-2 text-center font-bold">
                {["일", "월", "화", "수", "목", "금", "토"].map(
                    (day, index) => (
                        <div className="bg-blue-200 rounded-sm py-1"  key={index}>{day}</div>
                    )
                )}
            </div>

            {/* 달력 날짜 표시 */}
            <div
                className="grid grid-cols-7 gap-1"
                style={{
                    gridTemplateRows: `repeat(${Math.ceil(
                        (monthMenu.length + getDay(startOfMonth(currentDate))) /
                            7
                    )}, 1fr)`,
                }}
            >
                {/* 빈칸 추가 */}
                {Array.from(
                    { length: getDay(startOfMonth(currentDate)) },
                    (_, i) => (
                        <DateMenuBlock key={`empty-${i}`} />
                    )
                )}

                {monthMenu.map(({ day, menuForDay }, index) => (
                    <DateMenuBlock
                        key={index}
                        day={day.getDate()}
                        menuForDay={menuForDay}
                    />
                ))}
            </div>
        </div>
    );
};

export default MenuClient;
