import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { todoApiActions } from "@/stores/apiSlice/todoApiSlice";
import TodoForm from "../forms/TodoForm";
import Sheet from "../Sheet";

const todoSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    dueDate: z.string().nonempty("Due Date is required"),
    status: z.enum(["PENDING", "COMPLETED"]),
});

const AddTodoSheet = () => {
    const [open, setOpen] = useState(false);
    const [createTodo, { isLoading }] = todoApiActions.createTodo();

    const form = useForm({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            title: "",
            description: "",
            dueDate: "",
            status: "PENDING",
        },
    });

    const onSubmit = async (data) => {
        try {
            await createTodo(data).unwrap();
            form.reset();
            setOpen(false);
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    return (
        <Sheet
            open={open}
            form={form}
            setOpen={setOpen}
            trigger={<Button className="bg-blue-500 w-[150px] h-12 rounded-xl">Add To-Do</Button>}
            sheetTitle={"Add a New To-Do"}
            content={<TodoForm form={form} onSubmit={onSubmit} isLoading={isLoading} />}
        />
    );
};

export default AddTodoSheet;
