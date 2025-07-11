import { createBrowserRouter } from "react-router";
import Root from "../layOut/Root";
import Home from "../pages/Home/Home";
import AuthLayout from "../layOut/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ForbiddenPage from "../pages/ErrorPage/ForbiddenPage/ForbiddenPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                path: "/",
                Component: Home,
            },
            {
                path: 'forbidden',
                Component: ForbiddenPage
            }
        ]
    },
    {
        path: "*",
        Component: ErrorPage
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
]);