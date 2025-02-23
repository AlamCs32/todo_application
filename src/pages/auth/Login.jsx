import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { userApiAction } from "@/stores/apiSlice/userApiSlice";
import { setAuthorization } from "@/stores/slices/authSlice";
import { useDispatch } from "react-redux";
import LoginForm from "@/components/common/forms/LoginForm";

// Zod Validation Schema
const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(5, "Password must be at least 5 characters"),
});

const Login = () => {
    const dispatch = useDispatch();
    const [loginSubmitHandler, { isLoading }] = userApiAction.login();

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (data) => {
        try {
            const response = await loginSubmitHandler(data).unwrap();
            const { accessToken, refreshToken, user } = response.data;

            dispatch(
                setAuthorization({
                    isAuthorized: true,
                    userId: user.userId,
                    role: user.role,
                    profile: user.profile,
                    accessToken,
                    refreshToken,
                })
            );

            form.reset();
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <Card className="w-[500px] shadow-lg p-5">
                <CardHeader>
                    <CardTitle className="text-center text-lg">
                        Welcome Back! 👋
                    </CardTitle>
                    <p className="text-center text-sm text-gray-600">
                        Log in to your To-Do Application to stay productive!
                    </p>
                </CardHeader>
                <CardContent>
                    <LoginForm form={form} isLoading={isLoading} onSubmit={onSubmit} />
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
