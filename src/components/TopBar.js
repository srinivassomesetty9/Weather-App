import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
// import { Avatar } from "@mui/material";

const navItems = ["Logout"];

export default function TopBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  let navigate = useNavigate();

  const handleNavItemClick = (item) => {
    navigate(`/`);
    localStorage.removeItem("user");
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ backgroundColor: "rgb(6 68 125)" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <img className="logo-img" src="./icon2.png" alt="Weather App" />
          <h3>Weather App</h3>
          <Typography
            variant="h6"
            noWrap
            component="div"
            // onClick={() => navigate("/")}
            sx={{
              flexGrow: 1,
              display: { xs: "initial", sm: "block" }, // Changed 'none' to 'initial'
            }}
            style={{ marginRight: "24px" }}
          >
            {/* Weather App */}
            {/* <span className="brand-slogan">Search</span> */}
          </Typography>
          {/* <Avatar sx={{ bgcolor:"inherit" }}>{}N</Avatar> */}
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                style={{ marginRight: "4px" }}
                variant="outlined"
                size="small"
                sx={{ color: "inherit" }}
                onClick={() => handleNavItemClick(item)}
                endIcon={<LogoutIcon />}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Menu for Navigation Items */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        {navItems.map((item) => (
          <MenuItem key={item} onClick={() => handleNavItemClick(item)}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
