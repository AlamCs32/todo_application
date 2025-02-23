import React, { useState } from "react";
import { format } from "date-fns";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const TodoForm = ({ form, onSubmit, isLoading }) => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    return (
        <Form {...form}>
            <form
                // onSubmit={form.handleSubmit(onSubmit)}
                onSubmit={(e) => { e.preventDefault(); form.handleSubmit(onSubmit)(); }}
                className="space-y-4 mt-4">
                {/* Title */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Due Date (Formatted to yyyy-MM-dd) */}
                <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Due Date</FormLabel>
                            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-between rounded-md border p-2 text-left shadow-sm focus:outline-none"
                                            onClick={() => setIsDatePickerOpen((prev) => !prev)}
                                        >
                                            {field.value ? format(new Date(field.value), "yyyy-MM-dd") : "Pick a date"}
                                            <CalendarIcon className="h-5 w-5 text-gray-500" />
                                        </button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value ? new Date(field.value) : null}
                                        onSelect={(date) => {
                                            field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                                            setIsDatePickerOpen(false);
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Status */}
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="COMPLETED">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Adding..." : "Add To-Do"}
                </Button>
            </form>
        </Form>
    );
};

export default TodoForm;
