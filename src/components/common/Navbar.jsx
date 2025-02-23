import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { setAuthorization } from "@/stores/slices/authSlice";
import logoImg from "@/assets/images/logo2.png";
import profileImg from "@/assets/images/profile.png";

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(setAuthorization({ isAuthorized: false, userId: null, role: null, accessToken: null, refreshToken: null }));
    };

    return (
        <div className="bg-primary h-[70px] flex items-center justify-between px-6 shadow-md text-lg sticky top-0">
            {/* Logo */}
            <Link to="/dashboard" className="text-xl text-primary-foreground font-bold flex items-center gap-2">
                <img src={logoImg} alt="Logo" className="h-11 w-11" /> To-Do Application
            </Link>

            {/* Profile Avatar & Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.avatar || profileImg} alt="Profile" />
                        <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={8} className="w-48 rounded-lg text-lg">
                    <DropdownMenuItem>
                        <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default Navbar;
