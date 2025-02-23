import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { userApiAction } from "@/stores/apiSlice/userApiSlice";
import ResetPasswordForm from "@/components/common/forms/ResetPasswordForm";

// Zod Validation Schema
const resetPasswordSchema = z
    .object({
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [resetPasswordHandler, { isLoading }] = userApiAction.resetPassword();

    const form = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { password: "", confirmPassword: "" },
    });

    const onSubmit = async (data) => {
        try {
            await resetPasswordHandler({ token, ...data }).unwrap();
            alert("Password reset successfully! You can now log in.");
            navigate("/login"); // Redirect to login page after success
        } catch (error) {
            console.error("Password reset failed:", error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <Card className="w-[500px] shadow-lg p-5">
                <CardHeader>
                    <CardTitle className="text-center text-lg">Reset Password</CardTitle>
                    <p className="text-center text-sm text-gray-600">
                        Enter your new password below.
                    </p>
                </CardHeader>
                <CardContent>
                    <ResetPasswordForm form={form} isLoading={isLoading} onSubmit={onSubmit} />
                </CardContent>
            </Card>
        </div>
    );
};

export default ResetPassword;
