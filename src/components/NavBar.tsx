import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser, User } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

const NavBar = async () => {
    const user = await currentUser();

    return (
        <div className="flex items-center justify-between p-4">
            {/* search bar */}
            <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
                <Image src="/search.png" alt="" width={14} height={14} />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-[200px] p-2 bg-transparent outline-none"
                />
            </div>
            {/* icon and user */}
            <div className="flex items-center gap-6 justify-end w-full">
                <div className="flex flex-col">
                    <span className="text-xs leading-3 font-medium">
                        {user?.publicMetadata?.role as string}
                    </span>
                </div>
                <UserButton />
            </div>
        </div>
    );
};

export default NavBar;
