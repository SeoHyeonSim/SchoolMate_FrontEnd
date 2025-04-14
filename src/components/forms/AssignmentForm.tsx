"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "./InputField";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState } from "react-dom";
import { createAssignment, updateAssignment } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
    assignmentSchema,
    AssignmentSchema,
} from "@/lib/formValidationSchemas";

const AssignmentForm = ({
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
    } = useForm<AssignmentSchema>({
        resolver: zodResolver(assignmentSchema),
    });

    const [state, formAction] = useFormState(
        type === "create" ? createAssignment : updateAssignment,
        {
            success: false,
            error: false,
        }
    );

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        formAction(data)
    });

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast(
                `Announcement has been ${
                    type === "create" ? "created" : "updated"
                }!`
            );
            setOpen(false);
            router.refresh();
        }
    }, [state, router, type, setOpen]);

    const { lessons } = relatedData;

    return (
        <form className="flex flex-col gap-8 p-2" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create"
                    ? "Create a new Assignment"
                    : "Update the Assignment"}
            </h1>{" "}
            <div className="flex flex-wrap gap-14 px-1 pb-2">
                <InputField
                    label="Assignment Title"
                    name="title"
                    defaultValue={data?.title}
                    register={register}
                    error={errors?.title}
                />
                <InputField
                    label="Start Date"
                    name="startDate"
                    type="datetime-local"
                    defaultValue={
                        data?.startDate
                            ? new Date(data.startDate)
                                  .toISOString()
                                  .slice(0, 16)
                            : ""
                    }
                    register={register}
                    error={errors.startDate}
                />

                <InputField
                    label="Due Date"
                    name="dueDate"
                    type="datetime-local"
                    defaultValue={
                        data?.dueDate
                            ? new Date(data.dueDate).toISOString().slice(0, 16)
                            : ""
                    }
                    register={register}
                    error={errors.dueDate}
                />
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Lesson</label>
                    <select
                        {...register("lessonId")}
                        defaultValue={data?.lessonId}
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                    >
                        {lessons &&
                            lessons.map(
                                (lesson: { id: number; name: string }) => (
                                    <option key={lesson.id} value={lesson.id}>
                                        {lesson.name}
                                    </option>
                                )
                            )}
                    </select>
                    {errors.lessonId && (
                        <p className="text-xs text-red-500">
                            {errors.lessonId.message}
                        </p>
                    )}
                </div>
                {type === "update" && data?.id && (
                    <input
                        type="hidden"
                        {...register("id")}
                        defaultValue={data.id}
                    />
                )}

                {state.error && (
                    <p className="text-red-500 text-sm">
                        Something went wrong!
                    </p>
                )}
            </div>
            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default AssignmentForm;
