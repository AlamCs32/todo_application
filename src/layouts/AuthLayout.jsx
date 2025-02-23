import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="h-screen w-full flex">
            <div className="flex-1 bg-primary flex items-center justify-center">
                <h1 className="text-white text-3xl font-bold">Welcome to To-Do Application</h1>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
