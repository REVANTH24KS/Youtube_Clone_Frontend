import React, { useEffect, useState } from "react";
import "./Cards2.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Days, Views } from "./service";
import axios from "axios";
import asserts from "../assert";

//Backend URL
const api_url = asserts.backend_url;

const Cards2 = ({ video, route }) => {
  const [daysAgo, setDaysAgo] = useState("");
  const [formattedViews, setFormattedViews] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  let token = localStorage.getItem("token");
  let navigate = useNavigate();

  useEffect(() => {
    let formattedDays = Days({ date: video.date });
    setDaysAgo(formattedDays);
    let formattedViews = Views({ views: video.views });
    setFormattedViews(formattedViews);
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = async () => {
    if (route == "video/delete-video") {
      let id =video._id;
      try {
        let response = await axios.delete(`${api_url}/${route}/${id}` );
      } catch {
        alert("Can't Remove Video , try again later");
      }
      setAnchorEl(null);
    } else {
      try {
        let response = await axios.put(
          `${api_url}/${route}`,
          { id: video._id },
          {
            headers: {
              "x-auth": token,
            },
          }
        );
      } catch {
        alert("Can't Remove Video , try again later");
      }
      setAnchorEl(null);
    }
  };
  return (
    <Card className="video-card" sx={{ cursor: "pointer" }}>
      <div className="card-content">
        <div
          className="video-container"
          onClick={() => navigate(`/play/${video._id}`)}
        >
          <video
            className="video-element"
            controls={false}
            autoPlay={false}
            loop
            muted={true}
          >
            <source src={video.video} type="video/mp4" />
          </video>
        </div>
        <div className="content-container">
          <CardHeader
            action={
              <div>
                <IconButton aria-label="settings" onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleRemove}>Remove</MenuItem>
                </Menu>
              </div>
            }
            title={
              <Typography
                variant="subtitle1"
                onClick={() => navigate(`/play/${video._id}`)}
              >
                {video.title}
              </Typography>
            }
            subheader={
              <div>
                <Typography
                  variant="subtitle2"
                  onClick={() => navigate(`/play/${video._id}`)}
                >
                  {video.channelName}
                </Typography>
                <Typography variant="subtitle2">
                  {formattedViews} views
                </Typography>
                <Typography variant="subtitle2">{daysAgo}</Typography>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
};

export default Cards2;
