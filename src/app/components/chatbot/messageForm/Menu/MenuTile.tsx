import React from "react";

interface MealTileProps {
    day: string;
    date: string;
    menu: string[];
    description?: string;
}

const MenuTile = ({ day, date, menu, description }: MealTileProps) => {
    return (
        <div className="p-3 border rounded-lg shadow-sm bg-gray-100">
            <div className="text-sm font-semibold text-gray-800">
                {day} ({new Date(date).toLocaleDateString()})
            </div>

            <div className="mt-1 text-gray-600">{menu.join(", ")}</div>

            {description && (
                <div className="mt-2 text-sm text-purple-500">
                    {description}
                </div>
            )}
        </div>
    );
};

export default MenuTile;
