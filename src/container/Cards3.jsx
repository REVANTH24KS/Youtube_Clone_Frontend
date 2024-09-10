import React, { useEffect, useState } from "react";
import "./Cards.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import { CardHeader, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Days, Views, truncateText } from "./service";

const Cards3 = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [daysAgo, setDaysAgo] = useState("");
  const [formattedViews, setFormattedViews] = useState("");
  const [title, setTitle] = useState(video.title);
  let navigate = useNavigate();

  useEffect(() => {
    let formattedDays = Days({ date: video.date });
    setDaysAgo(formattedDays);
    let formattedViews = Views({ views: video.views });
    setFormattedViews(formattedViews);
    let formattedTitle = truncateText(video.title, 30);
    setTitle(formattedTitle);
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
        display: "flex",
        flexDirection: "row",
        backgroundColor: "black",
        color: "white",
        width: { lg: 500, md: 350 },
        height: { lg: 170, md: 120 },
        cursor: "pointer",
      }}
      onMouseEnter={() => handleHoverChange(true)}
      onMouseLeave={() => handleHoverChange(false)}
      onClick={() => navigate(`/play/${video._id}`)}
    >
      <div
        style={{
          width: "60%",
          height: "100%",
          position: "relative",
          cursor: "pointer",
        }}
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
          Your browser does not support the video tag.
        </video>
      </div>
      <div style={{ width: "40%" }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <div style={{ width: "100%" }}>
              <Typography
                sx={{ fontSize: { lg: "16px", md: "10px" }, width: "100%" }}
              >
                {title}
              </Typography>
            </div>
          }
          subheader={
            <div>
              <Typography
                variant="subtitle1"
                sx={{ color: "white", fontSize: { lg: "12px", md: "8px" } }}
              >
                {video.channelName}
              </Typography>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "white", fontSize: { lg: "12px", md: "8px" } }}
                >
                  {formattedViews} views
                </Typography>
                <Typography
                  variant="subtitle2"
                  style={{
                    color: "white",
                    marginLeft: { lg: "2px", md: "0px" },
                    marginRight: { lg: "2px", md: "0px" },
                    fontSize: { lg: "12px", md: "8px" },
                  }}
                >
                  |
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "white", fontSize: { lg: "12px", md: "8px" } }}
                >
                  {daysAgo}
                </Typography>
              </div>
            </div>
          }
        />
      </div>
    </Card>
  );
};

export default Cards3;
