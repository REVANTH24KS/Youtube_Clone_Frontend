import React, { useEffect, useState } from "react";
import "./Base.css";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import SideBar from "../container/SideBar";
import Footer from "../container/Footer";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";
import NotificationBox from "../container/NotificationBox";
import { getUser, updateNotification } from "../container/routes";
import { Avatar } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Base = ({ children }) => {
  let navigate = useNavigate();
  let [notificationCount, setNotificationCount] = useState(0);
  let [user, setUser] = useState("");
  let [searchText, setSearchText] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    //Get User
    useEffect(() => {
      let token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return false;
      }
      async function getData() {
        try {
          let res = await getUser(token);
        setUser(res);
        let temp = 0;
        res.notifications.map((val) => {
          if (!val.isViewed) {
            temp++;
          }
        });
        setNotificationCount(temp);
        } catch (error) {
          alert("Invalid Authentication")
        }
      }
      getData();
    }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  //handle Logut
  function handleLogut() {
    handleMenuClose();
    localStorage.removeItem("token");
    navigate("/login");
  }
    //For Notification
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const handleToggleNotification = async () => {
      let token = localStorage.getItem("token");
      setIsNotificationOpen(!isNotificationOpen);
      setNotificationCount(0)
      await updateNotification({token})
    };
  
    const handleCloseNotification = () => {
      setIsNotificationOpen(false);
    };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogut}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show notifications"
          color="inherit"
          onClick={handleToggleNotification}
        >
          <Badge badgeContent={notificationCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <NotificationBox
          isOpen={isNotificationOpen}
          handleClose={handleCloseNotification}
          content={user.notifications}
        />
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleLogut}
        >
          <LogoutIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  //For SideBar
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  //on key enter in search box
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    navigate(`/search/${searchText}`);
  };
  return (
    <div className="Base-container">
      <SideBar state={state} toggleDrawer={toggleDrawer} />
      <Box
        sx={{ flexGrow: 1, position: "fixed", zIndex: "10", width: "100vw" }}
      >
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, display: { xs: "none", sm: "block" } }}
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>
            <Avatar
              sx={{
                bgcolor: "red[500]",
                marginRight: "8px",
                width: 50,
                height: 50,
                cursor: "pointer"
              }}
              src={"https://www.logo.wine/a/logo/YouTube/YouTube-Icon-Full-Color-Logo.wine.svg"}
              alt="logo"
              onClick={() => navigate("/")}
            />
            
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              YouTube
            </Typography>
            <Search sx={{ marginLeft: "auto", marginRight: "auto", flex: "1" }}>
              <SearchIconWrapper>
                <SearchIcon  onClick={handleSearch}/>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                sx={{ marginLeft: "auto", marginRight: "auto", width: "100%" }}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={handleKeyPress}
                value={searchText}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show notifications"
                color="inherit"
                onClick={handleToggleNotification}
              >
                <Badge badgeContent={notificationCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <NotificationBox
                isOpen={isNotificationOpen}
                handleClose={handleCloseNotification}
                content={user.notifications}
              />
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
               <Avatar alt={user.name} src={user.image} />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
      <main className="base-main" onClick={handleCloseNotification}>
        {children}
      </main>
      <div className="footer-box">
        <Footer toggleDrawer={toggleDrawer} />
      </div>
    </div>
  );
};

export default Base;
