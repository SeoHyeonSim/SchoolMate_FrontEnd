import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export const dynamic = "force-dynamic";

export async function GET() {
    console.log("fetching menus from server...");
    try {
        const menus = await prisma.menu.findMany({
            orderBy: {
                date: "asc",
            },
        });

        return NextResponse.json(menus);
    } catch (error) {
        console.error("Failed to fetch menus:", error);
        return NextResponse.json(
            { error: "Failed to fetch menus" },
            { status: 500 }
        );
    }
}
