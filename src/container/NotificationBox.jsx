import React from "react";
import "./NotificationBox.css";
import { Avatar, Typography } from "@mui/material";
import { Days } from "./service";
import { useNavigate } from "react-router";

const NotificationBox = ({ isOpen, handleClose, content }) => {
  let navigate=useNavigate();
  return (
    <div className={`notification-box ${isOpen ? "open" : "close"}`}>
 
      {content && content.map((val, key) => (
          <NotificationCard data={val} key={key}  />
        ))}
        {
          <p>No Notifications !</p>
        }
      <div className="overlay" onClick={handleClose}>
      </div>
    </div>
  );
};

const NotificationCard = ({ data }) => {
  let navigate=useNavigate();
  let date=Days({date:data.date})
  return (
    <div className="notification-content-box">
      <Avatar
        sx={{
          bgcolor: "white",
          marginRight: "8px",
          border: "1px solid gray",
          borderRadius: "50px",
        }}
        src={data.image}
        alt={data.title}
        onClick={() => navigate(`/channel/${data.id}`)}
      />
     <span>
     <Typography
        sx={{ fontSize: "[16px]" }}
        onClick={() => navigate(`/play/${data.video}`)}
      >
        {data.channelName} Uploaded: {data.title}
      </Typography>
      <Typography
        sx={{ fontSize: "[16px]" }}
        onClick={() => navigate(`/play/${data.video}`)}
      >
        {date}
      </Typography>
     </span>
    </div>
  );
};

export default NotificationBox;
