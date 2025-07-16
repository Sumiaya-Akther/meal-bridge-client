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
import ManageDonations from "../pages/Dashboard/Admin/ManageDonation/ManageDonations";
import MyDonations from "../pages/Dashboard/Restaurant/MyDonations/MyDonations";
import UpdateDonation from "../pages/Dashboard/Restaurant/MyDonations/UpdateDonation";
import FeatureDonations from "../pages/Dashboard/Admin/FeatureDonation/FeatureDonations";
import RequestCharity from "../pages/Dashboard/User/RequestCharity/RequestCharity";
import Payment from "../pages/Dashboard/User/RequestCharity/Payment/Payment";
import ManageRoleRequests from "../pages/Dashboard/Admin/ManageRole/ManageRoleRequests";
import TransactionHistory from "../pages/Dashboard/User/TransactionHistory/TransactionHistory";
import AllDonations from "../pages/AllDonations/AllDonations";
import DonationDetails from "../pages/DonationDetails/DonationDetails";
import RequestedDonations from "../pages/Dashboard/Restaurant/RequestDonetion/RequestedDonations";
import MyRequests from "../pages/Dashboard/Charity/MyReques/MyRequests";
import MyPickups from "../pages/Dashboard/Charity/MyPickup/MyPickups";
import ReceivedDonations from "../pages/Dashboard/Charity/ReceiveDonations/ReceivedDonations";
import Favorites from "../pages/Dashboard/User/Favorites/Favorites";
import MyReviews from "../pages/Dashboard/User/MyReview/MyReviews";
import ManageRequests from "../pages/Dashboard/Admin/ManageRequest/ManageRequests";

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
            },
            {
                path: 'allDonations',
                element: <PrivateRoute>
                    <AllDonations></AllDonations>
                </PrivateRoute>
            },
            {
                path: 'donations/:id',
                element: <PrivateRoute>
                    <DonationDetails></DonationDetails>
                </PrivateRoute>
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
            //user dashboard
            {
                path: 'request-charity',
                Component: Payment
            },
            {
                path: 'favorites',
                Component: Favorites
            },
            {
                path: 'reviews',
                Component: MyReviews
            },
            {
                path: 'transaction-history',
                Component: TransactionHistory
            },

            //restaurant dashboard

            {
                path: 'add-donation',
                Component: AddDonation
            },
            {
                path: 'update-donation/:id',
                Component: UpdateDonation
            },
            {
                path: 'my-donations',
                Component: MyDonations
            },
            {
                path: 'requested-donations',
                Component: RequestedDonations
            },

            //charity dashboard

            {
                path: 'my-requests',
                Component: MyRequests
            },
            {
                path: 'my-pickups',
                Component: MyPickups
            },
            {
                path: 'received',
                Component: ReceivedDonations
            },
            {
                path: 'transaction-history',
                Component: TransactionHistory
            },

            //admin dashboard

            {
                path: 'manage-users',
                Component: ManageUsers
            },

            {
                path: 'manage-donations',
                Component: ManageDonations
            },
            {
                path: 'feature-donations',
                Component: FeatureDonations
            },
            {
                path: 'manage-role-requests',
                Component: ManageRoleRequests
            },
            {
                path: 'manage-requests',
                Component: ManageRequests
            }
        ]
    }
]);
