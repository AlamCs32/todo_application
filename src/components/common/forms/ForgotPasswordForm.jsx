import React from "react";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Button from "../Button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const ForgotPasswordForm = ({ form, onSubmit, isLoading }) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending link..." : "Send Reset Link"}
                </Button>

                {/* Back to Login Link */}
                <div className="text-center text-sm text-gray-600">
                    Remembered your password?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </div>
            </form>
        </Form>
    );
};

export default ForgotPasswordForm;
