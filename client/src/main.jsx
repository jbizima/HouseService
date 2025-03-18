// style files
import "./assets/app.css";
import "./assets/index.css";
import "./assets/dashboard.css";
import "./assets/login.css";
import "./assets/animation.css";
import "./assets/category.css";
import "./assets/service.css";
import "./assets/worker.css";
import "./assets/householder.css";
import "./assets/reports.css";
import "./assets/owner.css";

// react
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// page component
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectDashboard from "./utils/ProtectDashboard";
import GoogleRedirectHandler from "./utils/GoogleRedirectHandler";
import DashboardHome from "./pages/DashboardHome";
import AddCategoy from "./pages/AddCategoy";
import ViewCategory from "./pages/ViewCategory";
import AddService from "./pages/AddService";
import ViewService from "./pages/ViewService";
import AddWorker from "./pages/AddWorker";
import ViewWorker from "./pages/ViewWorker";
import ProtectHouseHolder from "./utils/ProtectHouseHolder";
import RootHouseHolder from "./pages/house-holder/RootHouseHolder";
import HomeHouseHolder from "./pages/house-holder/HomeHouseHolder";
import ViewCategoryService from "./pages/house-holder/ViewCategoryService";
import ViewCategoryServices from "./pages/house-holder/ViewCategoryServices";
import LoginAdmin from "./pages/LoginAdmin";
import PendingBookings from "./pages/PendingBookings";
import ApprovalBookings from "./pages/ApprovalBookings";
import DenyBooking from "./pages/DenyBooking";
import MyBookings from "./pages/house-holder/MyBookings";
import AllReports from "./pages/AllReports";
import FilterReports from "./pages/FilterReports";
import UpdateUser from "./pages/UpdateUser";
import UpdateHouseHolder from "./pages/house-holder/UpdateHouseHolder";
import PrintAllReports from "./pages/PrintAllReports";
import PrintFilterReports from "./pages/PrintFilterReport";
import LoginOwner from "./pages/LoginOwner";
import ProtectOwner from "./utils/ProtectOwner";
import DashboardOwner from "./pages/owner/DashboardOwner";
import DashboardOwnerHome from "./pages/owner/DashboardOwnerHome";
import ApprovalBookingsO from "./pages/owner/ApprovalBookings";
import PendingBookingsO from "./pages/owner/PendingBookings";
import DenyBookings from "./pages/owner/DenyBookings";
import AllReportsO from "./pages/owner/AllReports";
import FilterReportsO from "./pages/owner/FilterReports";
import PrintAllReportsO from "./pages/owner/PrintAllReports";
import PrintFilterReportsO from "./pages/owner/PrintFilterReport";
import FinanceReports from "./pages/FinanceReports";
import PrintFinanceReports from "./pages/PrintFinanceReports";
import UpdateUserO from "./pages/owner/updateUser";
import WorkerReports from "./pages/WorkerReports";
import WorkerReport from "./pages/WorkerReport";
import PrintWorkerReports from "./pages/PrintWorkerReports";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin",
    element: <LoginAdmin />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/business-owner",
    element: <LoginOwner />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/logins/callback",
    element: <GoogleRedirectHandler />,
    errorElement: <NotFoundPage />,
  },

  {
    element: <ProtectDashboard />,
    children: [
      {
        element: <Dashboard />,
        children: [
          {
            path: "/dashboard/home",
            element: <DashboardHome />,
          },
          {
            path: "/dashboard/add-category",
            element: <AddCategoy />,
          },
          {
            path: "/dashboard/view-category",
            element: <ViewCategory />,
          },
          {
            path: "/dashboard/add-service",
            element: <AddService />,
          },
          {
            path: "/dashboard/view-service",
            element: <ViewService />,
          },
          {
            path: "/dashboard/add-worker",
            element: <AddWorker />,
          },
          {
            path: "/dashboard/view-worker",
            element: <ViewWorker />,
          },
          {
            path: "/dashboard/pending-bookings",
            element: <PendingBookings />,
          },
          {
            element: <ApprovalBookings />,
            path: "/dashboard/approved-bookings",
          },
          {
            element: <DenyBooking />,
            path: "/dashboard/denied-bookings",
          },
          {
            element: <AllReports />,
            path: "/dashboard/all-reports",
          },
          {
            element: <FilterReports />,
            path: "/dashboard/filter-reports",
          },
          {
            element: <FinanceReports />,
            path: "/dashboard/finance-reports",
          },
          {
            element: <WorkerReports />,
            path: "/dashboard/worker-reports",
          },
          {
            element: <WorkerReport />,
            path: "/dashboard/business-owner",
          },
          {
            element: <PrintWorkerReports />,
            path: "/dashboard/print-allWorkerReport",
          },
          {
            element: <UpdateUser />,
            path: "/dashboard/update-user",
          },
          {
            element: <PrintAllReports />,
            path: "/dashboard/print-allReport/",
          },
          {
            element: <PrintFilterReports />,
            path: "/dashboard/print-filterReport/",
          },
          {
            element: <PrintFinanceReports />,
            path: "/dashboard/print-financeReport/",
          },
        ],
      },
      
    ],
  },
  {
    element: <ProtectOwner />,
    children: [
      {
        element: <DashboardOwner />,
        children: [
          {
            path: "/owner/home",
            element: <DashboardOwnerHome />,
          },
          {
            path: "/owner/pending-bookings",
            element: <PendingBookingsO />,
          },
          {
            element: <ApprovalBookingsO />,
            path: "/owner/approved-bookings",
          },
          {
            element: <DenyBookings />,
            path: "/owner/denied-bookings",
          },
          {
            element: <AllReportsO />,
            path: "/owner/all-reports",
          },
          {
            element: <FilterReportsO />,
            path: "/owner/filter-reports",
          },
          {
            element: <UpdateUserO />,
            path: "/owner/update-user",
          },
          {
            element: <PrintAllReportsO />,
            path: "/owner/print-allReport/",
          },
          {
            element: <PrintFilterReportsO />,
            path: "/owner/print-filterReport/",
          },
        ],
      },
      
    ],
  },
  {
    element: <ProtectHouseHolder />,
    children: [
      {
        element: <RootHouseHolder />,
        path: "/house-holder/",
        children: [
          {
            element: <HomeHouseHolder />,
            path: "/house-holder/",
            index: true,
          },
          {
            element: <ViewCategoryServices />,
            path: "/house-holder/service-category/",
          },
          {
            element: <ViewCategoryService />,
            path: "/house-holder/service/",
          },
          {
            element: <MyBookings />,
            path: "/house-holder/my-bookings",
          },
          {
            element: <UpdateHouseHolder />,
            path: "/house-holder/update",
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
