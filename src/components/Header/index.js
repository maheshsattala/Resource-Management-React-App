import { Link } from "react-router-dom";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import React from "react";
import "./index.css";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const Header = (props) => {
  const { isButton } = props;

  const onClickAvatar = () => {
    const { history } = props;

    history("/login");
  };
  return (
    <div className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-logo-container">
          <Link to="/resource-management">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dinhpbueh/image/upload/v1668151414/NxtWave_TM_Coloured_logo_1_k705pa.png"
              alt="website logo"
            />
          </Link>
          <div className="button-avatar-container">
            {isButton && (
              <Link to="/resource/add">
                <button type="button" className="add-btn">
                  ADD ITEM
                </button>
              </Link>
            )}
            <Tooltip title="LOGOUT">
              <IconButton onClick={onClickAvatar}>
                <img
                  className="profile-avatar"
                  src="https://res.cloudinary.com/dinhpbueh/image/upload/v1668151434/image_yl3z8p.png"
                  alt="profile avatar"
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

const withRouter = (Component) => (props) => {
  const history = useNavigate();
  const location = useLocation();
  const params = useParams();
  return (
    <Component
      params={params}
      history={history}
      location={location}
      {...props}
      replace
    />
  );
};

export default withRouter(Header);
