import Pagniation from "@/components/shared/Pagniation";
import Table from "@/components/shared/Table";
import TableSearch from "@/components/shared/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import React from "react";
import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import FormContainer from "@/components/forms/FormContainer";

type AttendanceList = {
    id: number;
    lessonName: string;
    studentName: string;
    studentSurname: string;
    present: boolean;
    date: Date;
    className: string;
};

const AttendanceListPage = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    const currentUserId = userId;

    const columns = [
        {
            header: "Lesson Name",
            accessor: "lessonName",
        },
        {
            header: "Student",
            accessor: "student",
        },
        {
            header: "Attendance",
            accessor: "present",
            className: "hidden md:table-cell",
        },
        {
            header: "Class",
            accessor: "class",
            className: "hidden md:table-cell",
        },
        {
            header: "Date",
            accessor: "date",
            className: "hidden md:table-cell",
        },
        ...(role === "admin" || role === "teacher"
            ? [
                  {
                      header: "Actions",
                      accessor: "action",
                  },
              ]
            : []),
    ];

    const renderRow = (item: AttendanceList) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
            <td className="flex items-center gap-4 p-4">{item.lessonName}</td>
            <td>{item.studentName + " " + item.studentSurname}</td>
            <td className="hidden md:table-cell">
                {item.present ? "Present" : "Absent"}
            </td>
            <td className="hidden md:table-cell">{item.className}</td>
            <td className="hidden md:table-cell">
                {new Intl.DateTimeFormat("en-US").format(item.date)}
            </td>
            <td>
                <div className="flex items-center gap-2">
                    {(role === "admin" || role === "teacher") && (
                        <>
                            <FormContainer
                                table="attendance"
                                type="update"
                                data={item}
                            />
                            <FormContainer
                                table="attendance"
                                type="delete"
                                id={item.id}
                            />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );

    const { page, ...queryParams } = searchParams;

    const p = page ? parseInt(page) : 1;

    // query
    const query: Prisma.AttendanceWhereInput = {};

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "studentId":
                        query.studentId = value;
                        break;
                    case "search":
                        query.OR = [
                            {
                                student: {
                                    name: {
                                        contains: value,
                                        mode: "insensitive",
                                    },
                                },
                            },
                            {
                                lesson: {
                                    name: {
                                        contains: value,
                                        mode: "insensitive",
                                    },
                                },
                            },
                        ];
                        break;
                    default:
                        break;
                }
            }
        }
    }

    // ROLE CONDITIONS
    switch (role) {
        case "admin":
            break;
        case "teacher":
            query.lesson = { teacherId: currentUserId! };
            break;
        case "student":
            query.studentId = currentUserId!;
            break;
        case "parent":
            query.student = { parentId: currentUserId! };
            break;
        default:
            break;
    }

    const [dataRes, count] = await prisma.$transaction([
        prisma.attendance.findMany({
            where: query,
            include: {
                student: { select: { name: true, surname: true } },
                lesson: {
                    select: {
                        name: true,
                        class: { select: { name: true } },
                    },
                },
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.attendance.count({ where: query }),
    ]);

    const data = dataRes.map((item: any) => ({
        id: item.id,
        lessonName: item.lesson.name,
        studentName: item.student.name,
        studentSurname: item.student.surname,
        present: item.present,
        date: item.date,
        className: item.lesson.class.name,
    }));

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* top */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">
                    Attendance
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end ">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image
                                alt=""
                                src="/filter.png"
                                width={14}
                                height={14}
                            />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image
                                src="/sort.png"
                                alt=""
                                width={14}
                                height={14}
                            />
                        </button>
                        {(role === "admin" || role === "teacher") && (
                            <FormContainer table="attendance" type="create" />
                        )}
                    </div>
                </div>
            </div>
            {/* list */}
            <Table columns={columns} renderRow={renderRow} data={data} />

            {/* pagination */}
            <Pagniation page={p} count={count} />
        </div>
    );
};

export default AttendanceListPage;
