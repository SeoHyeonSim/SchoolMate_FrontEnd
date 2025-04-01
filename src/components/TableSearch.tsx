"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TableSearch = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const value = (e.currentTarget[0] as HTMLInputElement).value;

        const params = new URLSearchParams(window.location.search);
        params.set("search", value);
        router.push(`${window.location.pathname}?${params}`);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleClear = () => {
        setSearchTerm("");
        const params = new URLSearchParams(window.location.search);
        params.delete("search");

        router.push(`${window.location.pathname}?${params}`);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2  "
        >
            <Image src="/search.png" alt="" width={12} height={12} />
            <input
                type="text"
                placeholder="Search"
                className="w-[200px] p-2 bg-transparent outline-none"
                onChange={handleChange}
                value={searchTerm}
            />

            {searchTerm && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="text-gray-400 hover:text-gray-600 pr-2 text-[15px]"
                >
                    x
                </button>
            )}
        </form>
    );
};

export default TableSearch;
