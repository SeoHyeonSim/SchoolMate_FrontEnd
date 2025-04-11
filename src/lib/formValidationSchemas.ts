import { z } from "zod";

export const subjectSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, { message: "Subject name is required!" }),
    teachers: z.array(z.string()), //teacher ids
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, { message: "Subject name is required!" }),
    capacity: z.coerce
        .number()
        .min(1, { message: "Capacity name is required!" }),
    gradeId: z.coerce.number().min(1, { message: "Grade name is required!" }),
    supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

export const teacherSchema = z.object({
    id: z.string().optional(),
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long!" })
        .max(20, { message: "Username must be at most 20 characters long!" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long!" })
        .optional()
        .or(z.literal("")),
    name: z.string().min(1, { message: "First name is required!" }),
    surname: z.string().min(1, { message: "Last name is required!" }),
    email: z
        .string()
        .email({ message: "Invalid email address!" })
        .optional()
        .or(z.literal("")),
    phone: z.string().optional(),
    address: z.string(),
    img: z.string().optional(),
    bloodType: z.string().min(1, { message: "Blood Type is required!" }),
    birthday: z.coerce.date({ message: "Birthday is required!" }),
    sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
    subjects: z.array(z.string()).optional(), // subject ids
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
    id: z.string().optional(),
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long!" })
        .max(20, { message: "Username must be at most 20 characters long!" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long!" })
        .optional()
        .or(z.literal("")),
    name: z.string().min(1, { message: "First name is required!" }),
    surname: z.string().min(1, { message: "Last name is required!" }),
    email: z
        .string()
        .email({ message: "Invalid email address!" })
        .optional()
        .or(z.literal("")),
    phone: z.string().optional(),
    address: z.string(),
    img: z.string().optional(),
    bloodType: z.string().min(1, { message: "Blood Type is required!" }),
    birthday: z.coerce.date({ message: "Birthday is required!" }),
    sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
    gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
    classId: z.coerce.number().min(1, { message: "Class is required!" }),
    parentId: z.string().min(1, { message: "Parent Id is required!" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;

export const examSchema = z.object({
    id: z.coerce.number().optional(),
    title: z.string().min(1, { message: "Title name is required!" }),
    startTime: z.coerce.date({ message: "Start time is required!" }),
    endTime: z.coerce.date({ message: "End time is required!" }),
    lessonId: z.coerce.number({ message: "Lesson is required!" }),
});

export type ExamSchema = z.infer<typeof examSchema>;

export const announcementSchema = z.object({
    id: z.coerce.number().optional(),
    title: z.string().min(1, { message: "Title name is required!" }),
    description: z.string().min(1, { message: "Description is required!" }),
    date: z.coerce.date({ message: "Date is required!" }),
    classId: z.coerce.number({ message: "Class Id is required!" }),
});

export type AnnouncementSchema = z.infer<typeof announcementSchema>;

export const assignmentSchema = z.object({
    id: z.coerce.number().optional(),
    title: z.string().min(1, { message: "Assignment title is required" }),
    startDate: z.coerce.date({ message: "Start date is required" }),
    dueDate: z.coerce.date({ message: "Due date is required" }),
    lessonId: z.coerce.number({ message: "Lesson is required" }),
});

export type AssignmentSchema = z.infer<typeof assignmentSchema>;

export const eventSchema = z.object({
    id: z.coerce.number().optional(),
    title: z.string().min(1, { message: "Event title is required" }),
    description: z.string().min(1, { message: "Description is required!" }),
    startTime: z
        .string()
        .regex(/^\d{2}:\d{2}$/, { message: "Invalid time format" }),
    endTime: z
        .string()
        .regex(/^\d{2}:\d{2}$/, { message: "Invalid time format" }),
    classId: z.coerce.number({ message: "Class Id is required!" }),
});

export type EventSchema = z.infer<typeof eventSchema>;

// lesson
export const lessonSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, { message: "Lesson name is required" }),
    day: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"], {
        errorMap: () => ({ message: "Invalid day selected" }),
    }),
    startTime: z.coerce.date({ message: "Start time is required" }),
    endTime: z.coerce.date({ message: "End time is required" }),
    subjectId: z.coerce.number({ message: "Subject is required" }),
    classId: z.coerce.number({ message: "Class is required" }),
    teacherId: z.string({ required_error: "Teacher is required" }),
});

export type LessonSchema = z.infer<typeof lessonSchema>;

// parent
export const parentSchema = z.object({
    id: z.string().optional(),
    username: z.string().min(1, { message: "Username is required" }),
    name: z.string().min(1, { message: "Name is required" }),
    surname: z.string().min(1, { message: "Surname is required" }),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    phone: z.string().min(1, { message: "Phone number is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    students: z.array(z.number()).optional(),
});

export type ParentSchema = z.infer<typeof parentSchema>;

// attendance
export const attendanceSchema = z.object({
    id: z.coerce.number().optional(),
    date: z.coerce.date({ message: "Date is required!" }),
    present: z.boolean().optional(),
    studentId: z.string().min(1, { message: "Student Id is required!" }),
    lessonId: z.coerce.number({ message: "Lesson Id is required!" }),
});

export type AttendanceSchema = z.infer<typeof attendanceSchema>;

// result
export const resultSchema = z.object({
    id: z.coerce.number().optional(),
    score: z.coerce
        .number({
            required_error: "Score is required",
            invalid_type_error: "Score must be a number",
        })
        .int()
        .min(0, { message: "Score must be 0 or greater" }),
    examId: z.coerce.number().optional().nullable(),
    assignmentId: z.coerce.number().optional().nullable(),
    studentId: z
        .string({
            required_error: "Student ID is required",
            invalid_type_error: "Student ID must be a string",
        })
        .min(1, { message: "Student ID cannot be empty" }),
});
export type ResultSchema = z.infer<typeof resultSchema>;
