import React, { useEffect, useState } from "react";
import "./Cards.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import { Avatar, CardHeader, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Days, Views } from "./service";

const Cards = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [daysAgo, setDaysAgo] = useState("");
  const [formattedViews, setFormattedViews] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    let formattedDays = Days({ date: video.date });
    setDaysAgo(formattedDays);
    let formattedViews = Views({ views: video.views });
    setFormattedViews(formattedViews);
  }, []);

  const handleHoverChange = (hovered) => {
    setIsHovered(hovered);
  };
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  return (
    <Card
      sx={{
        width: 345,
        backgroundColor: "black",
        color: "white",
        cursor: "pointer",
      }}
      onMouseEnter={() => handleHoverChange(true)}
      onMouseLeave={() => handleHoverChange(false)}
    >
      <div
        style={{ position: "relative", paddingTop: "56.25%" }}
        onClick={() => navigate(`/play/${video._id}`)}
      >
        <video
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          controls={false}
          autoPlay={isHovered}
          loop
          muted={isMuted}
          onClick={toggleMute}
        >
          <source src={video.video} type="video/mp4" />
        </video>
      </div>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                bgcolor: "white",
                marginRight: "8px",
                border: "1px solid gray",
                borderRadius: "50px",
              }}
              src={video.img}
              alt={video.title}
              onClick={() => navigate(`/channel/${video.creator}`)}
            />
            <Typography
              sx={{ fontSize: "[16px]" }}
              onClick={() => navigate(`/play/${video._id}`)}
            >
              {video.title}
            </Typography>
          </div>
        }
        subheader={
          <div style={{ marginLeft: "50px" }}>
            <Typography
              variant="subtitle1"
              onClick={() => navigate(`/channel/${video.creator}`)}
              sx={{ color: "white" }}
            >
              {video.channelName}
            </Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="subtitle2"
                onClick={() => navigate(`/play/${video._id}`)}
                sx={{ color: "white" }}
              >
                {formattedViews} views
              </Typography>
              <Typography
                variant="subtitle2"
                style={{ marginLeft: "8px", marginRight: "8px" }}
              >
                |
              </Typography>
              <Typography
                variant="subtitle2"
                onClick={() => navigate(`/play/${video._id}`)}
                sx={{ color: "white" }}
              >
                {daysAgo}
              </Typography>
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default Cards;
