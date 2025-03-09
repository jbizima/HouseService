import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useProtectPage } from "@/hooks/useProtectPage";
import logoPic from "/images/logo.png";
import { pendingBookingContext } from "@/pages/owner/DashboardOwner";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const booking = useContext(pendingBookingContext);
  const { logout, userData } = useProtectPage();
  
  const [openReports, setOpenReports] = useState(true);
  const [openBookings, setOpenBookings] = useState(true);
  const [openSettings, setOpenSettings] = useState(true);

  return (
    <div className="menu">
      <div className="logos">
        <img src={logoPic} alt="logo-admin" height={100} width={100} />
      </div>
      <div className="menu--list">
        <NavLink to="/owner/home" className="item">
          <i className="fa fa-home icon "></i>
          Dashboard
        </NavLink>
      
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
              to="/owner/pending-bookings"
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
              to="/owner/approved-bookings"
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
              to="/owner/denied-bookings"
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
              to="/owner/all-reports"
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
              to="/owner/filter-reports"
              className={
                openReports
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-solid fa-filter icon"></i>
              Filter
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
                onClick={() => navigate("/owner/update-user")}
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

        <NavLink to="/owner/add" className="item">
          <i className="fa-regular fa-circle-question icon"></i>
          Help
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
