import React from "react";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Button from "../Button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const ResetPasswordForm = ({ form, onSubmit, isLoading }) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* New Password Field */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter new password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Confirm Password Field */}
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Confirm new password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Resetting..." : "Reset Password"}
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

export default ResetPasswordForm;
