import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useProtectPage } from "../hooks/useProtectPage";
import logoPic from "/images/logo.png";
import { pendingBookingContext } from "@/pages/Dashboard";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const booking = useContext(pendingBookingContext);
  const { logout, userData } = useProtectPage();
  const [openCategory, setOpenCategory] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [openWorkers, setOpenWorkers] = useState(false);
  const [openReports, setOpenReports] = useState(false);
  const [openBookings, setOpenBookings] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div className="menu">
      <div className="logos">
        <img src={logoPic} alt="logo-admin" height={100} width={100} />
      </div>
      <div className="menu--list">
        <NavLink to="/dashboard/home" className="item">
          <i className="fa fa-home icon "></i>
          Dashboard
        </NavLink>
        <div className={openCategory ? "sidebar-item open" : "sidebar-item"}>
          <div className="sidebar-title">
            <span>
              <i className="fa-solid fa-layer-group icon"></i> Category
            </span>
            <i
              className="fa-solid fa-chevron-down toggle-btn"
              onClick={() => setOpenCategory((old) => !old)}
            ></i>
          </div>
          <div className="sidebar-content">
            <NavLink
              to="/dashboard/add-category"
              className={
                openCategory
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-square-plus icon"></i>
              Add
            </NavLink>
            <NavLink
              to="/dashboard/view-category"
              className={
                openCategory
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-eye icon"></i>
              View
            </NavLink>
          </div>
        </div>
        <div className={openService ? "sidebar-item open" : "sidebar-item"}>
          <div className="sidebar-title">
            <span>
              <i className="fa-solid fa-toolbox icon"></i> Services
            </span>
            <i
              className="fa-solid fa-chevron-down toggle-btn"
              onClick={() => setOpenService((old) => !old)}
            ></i>
          </div>
          <div className="sidebar-content">
            <NavLink
              to="/dashboard/add-service"
              className={
                openService
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-square-plus icon"></i>
              Add
            </NavLink>
            <NavLink
              to="/dashboard/view-service"
              className={
                openService
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-eye icon"></i>
              View
            </NavLink>
          </div>
        </div>
        <div className={openWorkers ? "sidebar-item open" : "sidebar-item"}>
          <div className="sidebar-title">
            <span>
              <i className="fa-solid fa-user-group icon"></i> Workers
            </span>
            <i
              className="fa-solid fa-chevron-down toggle-btn"
              onClick={() => setOpenWorkers((old) => !old)}
            ></i>
          </div>
          <div className="sidebar-content">
            <NavLink
              to="/dashboard/add-worker"
              className={
                openWorkers
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-square-plus icon"></i>
              Add
            </NavLink>
            <NavLink
              to="/dashboard/view-worker"
              className={
                openWorkers
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-eye icon"></i>
              View
            </NavLink>
          </div>
        </div>
        <div className={openBookings ? "sidebar-item open" : "sidebar-item"}>
          <div className="sidebar-title">
            <span>
              <i className="fa-solid fa-file icon"></i> Bookings
            </span>
            <i
              className="fa-solid fa-chevron-down toggle-btn"
              onClick={() => setOpenBookings((old) => !old)}
            ></i>
          </div>
          <div className="sidebar-content">
            <NavLink
              to="/dashboard/pending-bookings"
              className={
                openBookings
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-solid fa-spinner icon"></i>
              Pending
              <i className="fa-solid fa-bell">
                {" "}
                <span className="bell">
                  {booking.data && booking.data.length}
                </span>
              </i>
            </NavLink>
            <NavLink
              to="/dashboard/approved-bookings"
              className={
                openBookings
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-square-check icon"></i>
              Approved
            </NavLink>
            <NavLink
              to="/dashboard/denied-bookings"
              className={
                openBookings
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-rectangle-xmark icon"></i>
              Denied
            </NavLink>
          </div>
        </div>
        <div className={openReports ? "sidebar-item open" : "sidebar-item"}>
          <div className="sidebar-title">
            <span>
              <i className="fa-solid fa-folder-open icon"></i> Reports
            </span>
            <i
              className="fa-solid fa-chevron-down toggle-btn"
              onClick={() => setOpenReports((old) => !old)}
            ></i>
          </div>
          <div className="sidebar-content">
            <NavLink
              to="/dashboard/all-reports"
              className={
                openReports
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-calendar icon"></i>
              Date Range
            </NavLink>
            <NavLink
              to="/dashboard/filter-reports"
              className={
                openReports
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-solid fa-filter icon"></i>
              Filter
            </NavLink>
            <NavLink
              to="/dashboard/finance-reports"
              className={
                openReports
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-solid fa-chart-line icon"></i>
              Finance
            </NavLink>
            <NavLink
              to="/dashboard/worker-reports"
              className={
                openReports
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-solid fa-users icon"></i>
              Business owners
            </NavLink>
          </div>
        </div>
        <div className={openSettings ? "sidebar-item open" : "sidebar-item"}>
          <div className="sidebar-title">
            <span>
              <i className="fa-solid fa-gears icon"></i> Settings
            </span>
            <i
              className="fa-solid fa-chevron-down toggle-btn"
              onClick={() => setOpenSettings((old) => !old)}
            ></i>
          </div>
          <div className="sidebar-content">
            <div
              className={
                openSettings
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-envelope icon"></i>
              <span style={{ fontSize: "10px" }}>{userData.email}</span>
            </div>
            <div
              className={
                openSettings
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i
                className="fa-solid fa-pen-to-square icon"
                onClick={() => navigate("/dashboard/update-user")}
              ></i>
              update
            </div>
            <div
              className={
                openSettings
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i
                className="fa-solid fa-right-from-bracket icon"
                onClick={logout}
              ></i>
              logout
            </div>
          </div>
        </div>

        <NavLink to="/dashboard/add" className="item">
          <i className="fa-regular fa-circle-question icon"></i>
          Help
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
