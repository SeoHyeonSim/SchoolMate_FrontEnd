import {
    BellElectric,
    BookA,
    BookOpenText,
    CalendarDays,
    Check,
    GraduationCap,
    House,
    Megaphone,
    MessageCircleMore,
    NotebookPenIcon,
    Users,
} from "lucide-react";
import { PiExam } from "react-icons/pi";
import { GoChecklist } from "react-icons/go";
import { FaRegCheckSquare } from "react-icons/fa";

import { MdOutlineRestaurantMenu } from "react-icons/md";
import { MdFamilyRestroom } from "react-icons/md";

export const menuItems = [
    {
        title: "MENU",
        items: [
            {
                icon: <House size={20} />,
                label: "Home",
                href: "/",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: <GraduationCap size={23} />,
                label: "Teachers",
                href: "/list/teachers",
                visible: ["admin", "teacher"],
            },
            {
                icon: <Users size={20} />,
                label: "Students",
                href: "/list/students",
                visible: ["admin", "teacher"],
            },

            {
                icon: <BookA size={20} />,
                label: "Subjects",
                href: "/list/subjects",
                visible: ["admin"],
            },
            {
                icon: <BellElectric size={20} />,
                label: "Classes",
                href: "/list/classes",
                visible: ["admin", "teacher"],
            },
            {
                icon: <BookOpenText size={20} />,
                label: "Lessons",
                href: "/list/lessons",
                visible: ["admin", "teacher"],
            },
            {
                icon: <GoChecklist size={20} />,
                label: "Exams",
                href: "/list/exams",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: <NotebookPenIcon size={20} />,
                label: "Assignments",
                href: "/list/assignments",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: <PiExam size={22} />,
                label: "Results",
                href: "/list/results",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: <FaRegCheckSquare size={20} />,
                label: "Attendance",
                href: "/list/attendance",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: <CalendarDays size={20} />,
                label: "Events",
                href: "/list/events",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: <MessageCircleMore size={20} />,
                label: "Chatrooms",
                href: "/list/chatrooms",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: <Megaphone size={20} />,
                label: "Announcements",
                href: "/list/announcements",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: <MdOutlineRestaurantMenu size={20} />,
                label: "Menu",
                href: "/list/menu",
                visible: ["admin", "teacher", "student", "parent"],
            },
        ],
    },
];
