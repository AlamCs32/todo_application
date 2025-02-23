import React from "react";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Button from "../Button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const LoginForm = ({ form, onSubmit, isLoading }) => {
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

                {/* Password Field */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Forgot Password Link */}
                <div className="text-right">
                    <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                        Forgot Password?
                    </Link>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </Button>

                {/* Sign Up Option */}
                <div className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </div>
            </form>
        </Form>
    );
};

export default LoginForm;
