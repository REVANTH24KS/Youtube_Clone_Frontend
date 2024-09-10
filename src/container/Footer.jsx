import React from "react";
import "./Footer.css";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router";

const Footer = ({ toggleDrawer }) => {
  let navigate = useNavigate();
  return (
    <div className="footer-container">
      <div className="footer-content-box" onClick={() => navigate("/")}>
        <HomeIcon sx={{ m: -1, width: "50px", color: "white" }} />
        <p className="footer-names">Home</p>
      </div>
      <div
        className="footer-content-box"
        onClick={() => navigate("/subscribs")}
      >
        <SubscriptionsIcon sx={{ m: -1, width: "50px", color: "white" }} />
        <p className="footer-names">Subcriptions</p>
      </div>
      <div className="footer-content-box" onClick={toggleDrawer("left", true)}>
        <AccountCircle sx={{ m: -1, width: "50px", color: "white" }} />
        <p className="footer-names">You</p>
      </div>
    </div>
  );
};

export default Footer;
