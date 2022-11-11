import { Link } from "react-router-dom";

import React from "react";
import "./index.css";

function Header() {
  return (
    <div className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dinhpbueh/image/upload/v1668151414/NxtWave_TM_Coloured_logo_1_k705pa.png"
              alt="website logo"
            />
          </Link>
          <div className="button-avatar-container">
            <Link to="resource/add">
              <button type="button" className="add-btn">
                ADD ITEM
              </button>
            </Link>
            <img
              className="profile-avatar"
              src="https://res.cloudinary.com/dinhpbueh/image/upload/v1668151434/image_yl3z8p.png"
              alt="profile avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
