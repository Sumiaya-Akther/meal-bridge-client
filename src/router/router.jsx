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
import RestaurantRoute from "./RestaurantRoute";
import CharityRoute from "./CharityRoute";
import AdminRoute from "./AdminRoute";
import FeaturedDonations from "../component/FeaturedDonations/FeaturedDonations";
import DonationStats from "../pages/Dashboard/Restaurant/DonationStats/DonationStats";
import AboutUs from "../pages/About/AboutUs";
import ContactUs from "../pages/Contact/ContactUs";

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
                path: 'allDonations',
               Component:AllDonations
            },
            {
              path:'/about-us',
              Component:AboutUs
            },
            {
              path:'/contact',
              Component:ContactUs
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
        path: 'forbidden',
        Component: ForbiddenPage
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
                index: true,
                path: '/dashboard',
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
                element: <RestaurantRoute>
                    <AddDonation></AddDonation>
                </RestaurantRoute>
                //Component: AddDonation
            },
            {
                path: 'update-donation/:id',
                element: <RestaurantRoute>
                    <UpdateDonation></UpdateDonation>
                </RestaurantRoute>
                //Component: UpdateDonation
            },
            {
                path: 'my-donations',
                element: <RestaurantRoute>
                    <MyDonations></MyDonations>
                </RestaurantRoute>
                //Component: MyDonations
            },
            {
                path: 'requested-donations',
                element: <RestaurantRoute>
                    <RequestedDonations></RequestedDonations>
                </RestaurantRoute>
                //Component: RequestedDonations
            },
            {
                path:'donation-stats',
                element:<RestaurantRoute>
                    <DonationStats></DonationStats>
                </RestaurantRoute>
            },

            //charity dashboard

            {
                path: 'my-requests',
                element: <CharityRoute>
                    <MyRequests></MyRequests>
                </CharityRoute>
                //Component: MyRequests
            },
            {
                path: 'my-pickups',
                element: <CharityRoute>
                    <MyPickups></MyPickups>
                </CharityRoute>
                //Component: MyPickups
            },
            {
                path: 'received',
                element: <CharityRoute>
                    <ReceivedDonations></ReceivedDonations>
                </CharityRoute>
                //Component: ReceivedDonations
            },
            {
                path: 'transaction-history',
                Component: TransactionHistory
            },

            //admin dashboard

            {
                path: 'manage-users',
                element: <AdminRoute>
                    <ManageUsers></ManageUsers>
                </AdminRoute>
                //Component: ManageUsers
            },

            {
                path: 'manage-donations',
                element: <AdminRoute>
                    <ManageDonations></ManageDonations>
                </AdminRoute>
                //Component: ManageDonations
            },
            {
                path: 'feature-donations',
                element: <AdminRoute>
                    <FeatureDonations></FeatureDonations>
                </AdminRoute>
                //Component: FeatureDonations
            },
            {
                path: 'manage-role-requests',
                element: <AdminRoute>
                    <ManageRoleRequests></ManageRoleRequests>
                </AdminRoute>
                //Component: ManageRoleRequests
            },
            {
                path: 'manage-requests',
                element: <AdminRoute>
                    <ManageRequests></ManageRequests>
                </AdminRoute>
                //Component: ManageRequests
            }
        ]
    }
]);
