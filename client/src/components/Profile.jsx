import React from "react";
import logoImage from "/images/logo.png";

function Profile() {
  return (
    <div className="profile">
      <div className="user--profile">
        <div className="user--detail">
          <img src={logoImage} alt="" />
          <h3 className="username">House service</h3>
        </div>
        
      </div>
    </div>
  );
}

export default Profile;
