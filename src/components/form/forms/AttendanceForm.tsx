"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    attendanceSchema,
    AttendanceSchema,
} from "@/lib/formValidationSchemas";
import InputField from "../components/InputField";
import { Dispatch, SetStateAction, useEffect } from "react";
import { createAttendance, updateAttendance } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Lesson, Student } from "@prisma/client";
import { useFormState } from "react-dom";

const AttendanceForm = ({
    type,
    data,
    setOpen,
    relatedData,
}: {
    type: "create" | "update";
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
    relatedData?: any;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AttendanceSchema>({
        resolver: zodResolver(attendanceSchema),
    });

    const [state, formAction] = useFormState(
        type === "create" ? createAttendance : updateAttendance,
        {
            success: false,
            error: false,
        }
    );

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        formAction(data);
    });

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast(
                `Attendance has been ${
                    type === "create" ? "created" : "updated"
                }!`
            );
            setOpen(false);
            router.refresh();
        }
    }, [state, router, type, setOpen]);

    const { students, lessons } = relatedData;

    return (
        <form className="flex flex-col gap-8 p-4" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create"
                    ? "Create Attendance Record"
                    : "Update Attendance Record"}
            </h1>

            <div className="flex justify-between flex-wrap gap-4">
                {/* Date */}
                <InputField
                    label="Date"
                    name="date"
                    register={register}
                    error={errors?.date}
                    type="date"
                />

                {/* Present Checkbox */}
                <div className="flex items-center gap-2 pr-[65px]">
                    <input
                        type="checkbox"
                        {...register("present")}
                        defaultChecked={data?.present || false}
                        className="w-4 h-4 accent-blue-500 rounded-md"
                    />
                    <label className="text-[20px]">Present</label>
                </div>
            </div>

            <div className="flex justify-between flex-wrap gap-4">
                {/* Student Selection */}
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Student</label>
                    <select
                        {...register("studentId")}
                        defaultValue={data?.studentId}
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                    >
                        <option value="">--Select Student--</option>
                        {students.map((student: Student) => (
                            <option key={student.id} value={student.id}>
                                {student.name} {student.surname}
                            </option>
                        ))}
                    </select>
                    {errors.studentId && (
                        <p className="text-xs text-red-500">
                            {errors.studentId.message}
                        </p>
                    )}
                </div>

                {/* Lesson Selection */}
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Lesson</label>
                    <select
                        {...register("lessonId")}
                        defaultValue={data?.lessonId}
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                    >
                        <option value="">--Select Lesson--</option>
                        {lessons.map((lesson: Lesson) => (
                            <option key={lesson.id} value={lesson.id}>
                                {lesson.name}
                            </option>
                        ))}
                    </select>
                    {errors.lessonId && (
                        <p className="text-xs text-red-500">
                            {errors.lessonId.message}
                        </p>
                    )}
                </div>

                {data && (
                    <InputField
                        label="Id"
                        name="id"
                        defaultValue={data?.id}
                        register={register}
                        error={errors?.id}
                        hidden
                    />
                )}
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md"
            >
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default AttendanceForm;
