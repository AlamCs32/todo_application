import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userApiAction } from "@/stores/apiSlice/userApiSlice"; // ✅ Import the correct hook
import { setAuthorization } from "@/stores/slices/authSlice"
import { useDispatch } from "react-redux";

// Zod Validation Schema
const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(5, "Password must be at least 5 characters"),
});

const Login = () => {
    const dispatch = useDispatch()
    const [loginSubmitHandler, { isLoading }] = userApiAction.login();

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (data) => {
        const response = await loginSubmitHandler(data).unwrap();
        console.log("Login Success:", response.data);
        const { accessToken, refreshToken, user } = response.data
        dispatch(setAuthorization({
            isAuthorized: true,
            userId: user.userId,
            role: user.role,
            accessToken,
            refreshToken
        }))
        form.reset()
    };

    return (
        <div className="flex justify-center items-center ">
            <Card className="w-[500px] shadow-lg p-5">
                <CardHeader>
                    <CardTitle className="text-center text-lg">Login</CardTitle>
                </CardHeader>
                <CardContent>
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

                            {/* Submit Button */}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
