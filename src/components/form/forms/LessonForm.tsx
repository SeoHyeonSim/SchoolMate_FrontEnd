"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import { Dispatch, SetStateAction, useEffect } from "react";
import { lessonSchema, LessonSchema } from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { createLesson, updateLesson } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LessonForm = ({
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
    } = useForm<LessonSchema>({
        resolver: zodResolver(lessonSchema),
    });

    const [state, formAction] = useFormState(
        type === "create" ? createLesson : updateLesson,
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
                `Lesson has been ${type === "create" ? "created" : "updated"}!`
            );
            setOpen(false);
            router.refresh();
        }
    }, [state, router, type, setOpen]);

    const { subjects, classes, teachers } = relatedData;

    return (
        <form className="flex flex-col gap-8 p-2" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create"
                    ? "Create a new Lesson"
                    : "Update Lesson"}
            </h1>{" "}
            <span className="text-xs text-gray-400 font-medium">
                Lesson Information
            </span>
            <div className="flex justify-between flex-wrap gap-4 px-1 pb-2">
                <InputField
                    label="Lesson Name"
                    name="name"
                    defaultValue={data?.name}
                    register={register}
                    error={errors?.name}
                />

                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Day</label>
                    <select
                        {...register("day")}
                        defaultValue={data?.day}
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                    >
                        <option value="">--Select Day--</option>
                        <option value="MONDAY">Monday</option>
                        <option value="TUESDAY">Tuesday</option>
                        <option value="WEDNESDAY">Wednesday</option>
                        <option value="THURSDAY">Thursday</option>
                        <option value="FRIDAY">Friday</option>
                    </select>
                    {errors.day && (
                        <p className="text-xs text-red-500">
                            {errors.day.message}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Subject</label>
                    <select
                        {...register("subjectId")}
                        defaultValue={data?.subjectId}
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                    >
                        <option value="">--Select Subject--</option>
                        {subjects &&
                            subjects.map(
                                (subject: { id: number; name: string }) => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                )
                            )}
                    </select>
                    {errors.subjectId && (
                        <p className="text-xs text-red-500">
                            {errors.subjectId.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Class</label>
                    <select
                        {...register("classId")}
                        defaultValue={data?.classId}
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                    >
                        <option value="">--Select Class--</option>
                        {classes &&
                            classes.map((cls: { id: number; name: string }) => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.name}
                                </option>
                            ))}
                    </select>
                    {errors.classId && (
                        <p className="text-xs text-red-500">
                            {errors.classId.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Teacher</label>
                    <select
                        {...register("teacherId")}
                        defaultValue={data?.teacherId}
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                    >
                        <option value="">--Select Teacher--</option>
                        {teachers &&
                            teachers.map(
                                (teacher: {
                                    id: string;
                                    name: string;
                                    surname: string;
                                }) => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.name} {teacher.surname}
                                    </option>
                                )
                            )}
                    </select>

                    {errors.teacherId && (
                        <p className="text-xs text-red-500">
                            {errors.teacherId.message}
                        </p>
                    )}
                </div>

                <InputField
                    label="Start Time"
                    name="startTime"
                    type="datetime-local"
                    defaultValue={
                        data?.startTime
                            ? new Date(data.startTime)
                                  .toISOString()
                                  .slice(0, 16)
                            : ""
                    }
                    register={register}
                    error={errors.startTime}
                />

                {/* End Time */}
                <InputField
                    label="End Time"
                    name="endTime"
                    type="datetime-local"
                    defaultValue={
                        data?.endTime
                            ? new Date(data.endTime).toISOString().slice(0, 16)
                            : ""
                    }
                    register={register}
                    error={errors.endTime}
                />
            </div>
            {type === "update" && data?.id && (
                <input
                    type="hidden"
                    {...register("id")}
                    defaultValue={data.id}
                />
            )}

            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default LessonForm;
