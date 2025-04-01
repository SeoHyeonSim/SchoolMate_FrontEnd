"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    attendanceSchema,
    AttendanceSchema,
} from "@/lib/formValidationSchemas";
import InputField from "../InputField";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { createAttendance, updateAttendance } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Lesson, Student } from "@prisma/client";

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
        defaultValues: data || {},
    });

    const [state, formAction] = useState({ success: false, error: false });
    const router = useRouter();

    const onSubmit = handleSubmit(async (formData) => {
        const action = type === "create" ? createAttendance : updateAttendance;
        const result = await action(state, formData);

        if (result.success) {
            toast(
                `Attendance record has been ${
                    type === "create" ? "created" : "updated"
                } successfully!`
            );
            setOpen(false);
            router.refresh();
        } else {
            toast("An error occurred while processing the request.");
        }
    });

    useEffect(() => {
        if (state.success) {
            setOpen(false);
            router.refresh();
        }
    }, [state, router, setOpen]);

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
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register("present")}
                        defaultChecked={data?.present || false}
                    />
                    <label>Present</label>
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
