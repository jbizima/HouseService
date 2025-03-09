import { NavLink, Link, useNavigate } from "react-router-dom";
import { formatToDateString } from "@/utils/dateFormat.mjs";
import { useContext, useState } from "react";
import { userContext } from "@/pages/house-holder/RootHouseHolder";
import DropdownProfile from "./DropdownProfile";

export default function Navbar() {
  const [isBarClicked, setIsBarClicked] = useState(false);
  const date = Date.now();
  const contextData = useContext(userContext);
  const navigate = useNavigate();

  const [animation, setAnimation] = useState("animated fadeIn");
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openMenuModal, setOpenMenuModal] = useState(false);
  const handleModal = (typeOfModal) => {
    if (typeOfModal == "profile") {
      setAnimation(openProfileModal ? "animated fadeOut" : "animated fadeIn");
      setTimeout(() => {
        setOpenProfileModal((oldModalState) => !oldModalState);
      }, 1000);
    }
    if (typeOfModal == "menu") {
      setAnimation(openMenuModal ? "animated fadeOut" : "animated fadeIn");
      setTimeout(() => {
        setOpenMenuModal((oldModalState) => !oldModalState);
      }, 1000);
    }
  };

  return (
    <nav className="householder">
      <div className="toggle-btn-householder">
        <i
          id="bar"
          onClick={() => setIsBarClicked((oldState) => !oldState)}
          className={
            isBarClicked ? "icon-click fa fa-times" : "icon-click fa fa-bars"
          }
        ></i>
      </div>
      <ul className={`links ${isBarClicked && "active"}`}>
        <li>
          <NavLink to="/house-holder">Home</NavLink>
        </li>

        <li>
          <NavLink to="/house-holder">Services</NavLink>
        </li>

        <li>
          <NavLink to="/house-holder/my-bookings">
            My Bookings{" "}
            <i className="fa-solid fa-bell">
              {" "}
              <span className="bell-householder">
                {contextData.unreadNbr && contextData.unreadNbr}
              </span>
            </i>
          </NavLink>
        </li>
      </ul>

      <div className="right-info">
        <div className="name nowrap">
          {contextData.userData.email ? contextData.userData.email : "...."}
        </div>

        <span
          to="#"
          className="caret-down"
          onClick={() => handleModal("profile")}
        >
          <i className="fa fa-caret-down"></i>
        </span>
      </div>
      {openProfileModal && (
        <DropdownProfile
          closeModal={handleModal}
          animate={animation}
          user={contextData.userData}
          logout={contextData.logout}
        />
      )}
    </nav>
  );
}
