import { createBrowserRouter } from "react-router";
import Root from "../layOut/Root";
import Home from "../pages/Home/Home";
import AuthLayout from "../layOut/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ForbiddenPage from "../pages/ErrorPage/ForbiddenPage/ForbiddenPage";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import DashboardLayout from "../layOut/DashBoardLayout";
import AddDonation from "../pages/Dashboard/Restaurant/AddDonations/AddDonation";

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
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                path: 'profile',
                Component: MyProfile
            },
            {
                path: 'manage-users',
                Component:ManageUsers
            },
            {
                path: 'add-donation',
                Component: AddDonation
            }
        ]
    }
]);
