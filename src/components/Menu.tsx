import { menuItems } from "@/lib/menuItems";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const Menu = async () => {
    const user = await currentUser();
    const role = user?.publicMetadata.role as string;

    console.log(role);

    return (
        <div className="mt-4 text-sm">
            {menuItems.map((i) => (
                <div className="flex flex-col gap-2" key={i.title}>
                    {i.items.map((item) => {
                        if (item.visible.includes(role)) {
                            return (
                                <Link
                                    href={item.href}
                                    key={item.label}
                                    className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 hover:bg-gray-200 rounded-md px-2"
                                >
                                    <div className="w-5 h-5">{item.icon}</div>
                                    <span className="hidden lg:block">
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        }
                    })}
                </div>
            ))}
        </div>
    );
};

export default Menu;
