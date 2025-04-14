"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { resultSchema, ResultSchema } from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { createResult, updateResult } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ResultForm = ({
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
    } = useForm<ResultSchema>({
        resolver: zodResolver(resultSchema),
    });

    // state for selection type
    const [selectionType, setSelectionType] = useState<
        "exam" | "assignment" | ""
    >(data?.examId ? "exam" : data?.assignmentId ? "assignment" : "");

    const [state, formAction] = useFormState(
        type === "create" ? createResult : updateResult,
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
                `Result data has been ${
                    type === "create" ? "created" : "updated"
                }!`
            );
            setOpen(false);
            router.refresh();
        }
    }, [state, router, type, setOpen]);

    const { students, exams, assignments } = relatedData;

    return (
        <form className="flex flex-col gap-8 p-2" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create"
                    ? "Create a new result"
                    : "Update a new result"}
            </h1>
            <div className="flex justify-between flex-wrap gap-4">
                {/* Selection Type */}
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Select Type</label>
                    <select
                        value={selectionType}
                        onChange={(e) =>
                            setSelectionType(
                                e.target.value as "exam" | "assignment"
                            )
                        }
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                    >
                        <option value="">-- Select Type --</option>
                        <option value="exam">Exam</option>
                        <option value="assignment">Assignment</option>
                    </select>
                </div>

                {/* Conditional Rendered Select */}
                {selectionType === "exam" && (
                    <div className="flex flex-col gap-2 w-full md:w-1/4">
                        <label className="text-xs text-gray-500">Exam</label>
                        <select
                            {...register("examId")}
                            defaultValue={data?.examId || ""}
                            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        >
                            <option value="">-- Select Exam --</option>
                            {exams.map(
                                (exam: { id: number; title: string }) => (
                                    <option key={exam.id} value={exam.id}>
                                        {exam.title}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                )}

                {selectionType === "assignment" && (
                    <div className="flex flex-col gap-2 w-full md:w-1/4">
                        <label className="text-xs text-gray-500">
                            Assignment
                        </label>
                        <select
                            {...register("assignmentId")}
                            defaultValue={data?.assignmentId || ""}
                            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        >
                            <option value="">-- Select Assignment --</option>
                            {assignments.map(
                                (assignment: { id: number; title: string }) => (
                                    <option
                                        key={assignment.id}
                                        value={assignment.id}
                                    >
                                        {assignment.title}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                )}

                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Student</label>
                    <select
                        {...register("studentId")}
                        defaultValue={data?.studentId || ""}
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                    >
                        <option value="">-- Select Student --</option>
                        {students.map(
                            (student: {
                                id: string;
                                name: string;
                                surname: string;
                            }) => (
                                <option key={student.id} value={student.id}>
                                    {student.name} {student.surname}
                                </option>
                            )
                        )}
                    </select>
                    {errors.studentId && (
                        <p className="text-xs text-red-500">
                            {errors.studentId.message}
                        </p>
                    )}
                </div>

                <InputField
                    label="Score"
                    name="score"
                    type="number"
                    defaultValue={data?.score}
                    register={register}
                    error={errors?.score}
                />

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

            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default ResultForm;
