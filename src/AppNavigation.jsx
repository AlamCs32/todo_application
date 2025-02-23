import React from 'react';
import { usePermission } from './helpers/hooks/usePermission';
import { getRouteConfig } from './helpers/routeConfig';
import { Navigate, Route, Routes } from 'react-router-dom';
import { selectAuthState } from './stores/slices/authSlice';
import { useSelector } from 'react-redux';
import { ProtectedRoute, PublicRoute } from './routes';
// Pages
import Login from './pages/auth/Login';
import NotAuthorized from './pages/NotAuthorized';
import NotFound from './pages/NotFound';
import Signup from './pages/auth/Signup';
import ResetPassword from './pages/auth/ResetPassword';
import AuthLayout from './layouts/AuthLayout';
import ForgotPassword from './pages/auth/ForgotPassword';

const AppNavigation = () => {
    const { DASHBOARD_VIEW, PROFILE_VIEW } = usePermission();
    const auth = useSelector(selectAuthState);
    const isAuthorized = auth?.isAuthorized;

    const routeConfig = getRouteConfig({
        DASHBOARD_VIEW, PROFILE_VIEW
    });

    const navigateToPath = () => {
        let path = "/login";
        if (isAuthorized) {
            // get the first accessible route
            const firstLoadPage = routeConfig.find(item => item.accessible)?.path;
            path = firstLoadPage || "/dashboard";
        }
        return path;
    };

    // Render route Function
    const renderRoutes = (routes) => {
        return routes.map((route) => {
            const { path, element: Component, accessible, childrens } = route;
            if (childrens && childrens.length > 0) {
                return (
                    <Route
                        key={path}
                        path={path}
                        element={accessible ? <Component /> : <NotAuthorized />}
                    >
                        {renderRoutes(childrens)}
                    </Route>
                );
            }
            return (
                <Route
                    key={path}
                    path={path}
                    element={accessible ? <Component /> : <NotAuthorized />}
                />
            );
        });
    };

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicRoute isAuth={isAuthorized} redirectTo={navigateToPath()} />}>
                <Route
                    path='/'
                    element={<Navigate to={'/login'} replace />}
                />
                {/* Auth Layout */}
                <Route path='/' element={<AuthLayout />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/reset-password/:token' element={<ResetPassword />} />
                </Route>
            </Route>

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute isAuth={isAuthorized} redirectTo={navigateToPath()} />}>
                <Route
                    path='/'
                    element={<Navigate to={'/dashboard'} replace />}
                />
                {renderRoutes(routeConfig)}
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppNavigation;
