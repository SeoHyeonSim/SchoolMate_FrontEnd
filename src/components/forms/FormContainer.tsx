import FormModal from "./FormModal";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prismadb";

export type FormContainerProps = {
    table:
        | "teacher"
        | "student"
        | "parent"
        | "subject"
        | "class"
        | "lesson"
        | "exam"
        | "assignment"
        | "result"
        | "attendance"
        | "event"
        | "announcement";
    type: "create" | "update" | "delete";
    data?: any;
    id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
    let relatedData = {};

    const { userId, sessionClaims } = await auth();

    const role = (sessionClaims?.metadata as { role?: string })?.role;

    const currentUserId = userId;

    if (type !== "delete") {
        switch (table) {
            case "subject":
                const subjectTeachers = await prisma.teacher.findMany({
                    select: { id: true, name: true, surname: true },
                });
                relatedData = { teachers: subjectTeachers };
                break;
            case "class":
                const classGrades = await prisma.grade.findMany({
                    select: { id: true, level: true },
                });
                const classTeachers = await prisma.teacher.findMany({
                    select: { id: true, name: true, surname: true },
                });
                relatedData = { teachers: classTeachers, grades: classGrades };
                break;
            case "teacher":
                const teacherSubjects = await prisma.subject.findMany({
                    select: { id: true, name: true },
                });
                relatedData = { subjects: teacherSubjects };
                break;
            case "student":
                const studentGrades = await prisma.grade.findMany({
                    select: { id: true, level: true },
                });
                const studentClasses = await prisma.class.findMany({
                    include: { _count: { select: { students: true } } },
                });
                relatedData = {
                    classes: studentClasses,
                    grades: studentGrades,
                };
                break;
            case "exam":
                const examLessons = await prisma.lesson.findMany({
                    where: {
                        ...(role === "teacher"
                            ? { teacherId: currentUserId! }
                            : {}),
                    },
                    select: { id: true, name: true },
                });
                relatedData = { lessons: examLessons };
                break;
            case "announcement":
                const announcementClasses = await prisma.class.findMany({
                    select: { id: true, name: true },
                });
                relatedData = { classes: announcementClasses };
                break;
            case "assignment": {
                const role = (sessionClaims?.metadata as { role?: string })
                    ?.role;

                const lessons = await prisma.lesson.findMany({
                    where: {
                        ...(role === "teacher" ? { teacherId: userId! } : {}),
                    },
                    select: { id: true, name: true },
                });
                relatedData = { lessons };
                break;
            }
            case "event": {
                const eventClasses = await prisma.class.findMany({
                    select: { id: true, name: true },
                });

                relatedData = { classes: eventClasses };
                break;
            }
            case "lesson":
                const lessonsSubjects = await prisma.subject.findMany({
                    select: { id: true, name: true },
                });
                const lessonsClasses = await prisma.class.findMany({
                    select: { id: true, name: true },
                });
                const lessonsTeachers = await prisma.teacher.findMany({
                    select: { id: true, name: true, surname: true },
                });
                relatedData = {
                    subjects: lessonsSubjects,
                    classes: lessonsClasses,
                    teachers: lessonsTeachers,
                };
                break;
            case "parent":
                const parentStudents = await prisma.student.findMany({
                    select: { id: true, name: true, surname: true },
                });
                relatedData = { students: parentStudents };
                break;
            case "attendance":
                const attendanceStudents = await prisma.student.findMany({
                    select: { id: true, name: true, surname: true },
                });
                const attendanceLessons = await prisma.lesson.findMany({
                    select: { id: true, name: true },
                });

                relatedData = {
                    students: attendanceStudents,
                    lessons: attendanceLessons,
                };
                break;

            case "result":
                const exams = await prisma.exam.findMany({
                    select: { id: true, title: true },
                });

                const assignments = await prisma.assignment.findMany({
                    select: { id: true, title: true },
                });

                const students = await prisma.student.findMany({
                    select: { id: true, name: true, surname: true },
                });

                relatedData = {
                    exams,
                    assignments,
                    students,
                };
                break;

            default:
                break;
        }
    }
    return (
        <div>
            <FormModal
                table={table}
                type={type}
                data={data}
                id={id}
                relatedData={relatedData}
            />
        </div>
    );
};

export default FormContainer;
