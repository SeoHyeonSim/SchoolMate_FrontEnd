import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SchoolMate: Your Best School Manager",
    description: "Your Best School Manager",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" className="">
                <body className={inter.className}>
                    {children}
                    <ToastContainer position="bottom-center" theme="dark" />
                </body>
            </html>
        </ClerkProvider>
    );
}
