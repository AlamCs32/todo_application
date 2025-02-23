import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { userApiAction } from "@/stores/apiSlice/userApiSlice";
import ForgotPasswordForm from "@/components/common/forms/ForgotPasswordForm";

// Zod Validation Schema
const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email format"),
});

const ForgotPassword = () => {
    const [forgotPasswordHandler, { isLoading }] = userApiAction.forgotPassword();

    const form = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const onSubmit = async (data) => {
        try {
            await forgotPasswordHandler(data).unwrap();
            form.reset(); // ✅ Reset form after successful request
            alert("Password reset link sent! Check your email.");
        } catch (error) {
            console.error("Forgot password request failed:", error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <Card className="w-[500px] shadow-lg p-5">
                <CardHeader>
                    <CardTitle className="text-center text-lg">Forgot Password</CardTitle>
                    <p className="text-center text-sm text-gray-600">
                        Enter your email address, and we'll send you a link to reset your password.
                    </p>
                </CardHeader>
                <CardContent>
                    <ForgotPasswordForm form={form} isLoading={isLoading} onSubmit={onSubmit} />
                </CardContent>
            </Card>
        </div>
    );
};

export default ForgotPassword;
