import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import PortraitIcon from "@mui/icons-material/Portrait";
import HistoryIcon from "@mui/icons-material/History";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useNavigate } from "react-router";
import { getUser } from "./routes";

const SideBar = ({ state, toggleDrawer }) => {
  let navigate = useNavigate();
  let [user, setUser] = useState("");
  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        backgroundColor: "black",
        color: "white",
        height: ["100vh"],
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>
              <HomeIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
      </List>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("/subscribs")}>
          <ListItemIcon>
            <SubscriptionsIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary={"Subscriptions"} />
        </ListItemButton>
      </ListItem>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(`/channel/${user._id}`)}>
            <ListItemIcon>
              <PortraitIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Your Channel"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/history")}>
            <ListItemIcon>
              <HistoryIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"History"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/your-videos")}>
            <ListItemIcon>
              <SlideshowIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Your Videos"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/watch-later")}>
            <ListItemIcon>
              <ScheduleIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Watch Later"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/likes")}>
            <ListItemIcon>
              <ThumbUpOutlinedIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Liked Videos"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  //Get User
  useEffect(() => {
    let token = localStorage.getItem("token");
    async function getData() {
      let res = await getUser(token);
      setUser(res);
    }
    getData();
  }, []);

  return (
    <div className="side-bar">
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
};

export default SideBar;
