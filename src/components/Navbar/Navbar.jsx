import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LanguageIcon from "@mui/icons-material/Language";
import APIFetch from "../../utils/APIFetch";
import AdbIcon from "@mui/icons-material/Adb";

function Navbar() {
  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await APIFetch(`languages`);
      setLanguages(data);
    };
    fetchData();
  }, []);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" style={{ backgroundColor: "rgb(32, 128, 136)" }}>
      <Toolbar>
        <AdbIcon sx={{ display: { md: "flex" }, mr: 1 }} />
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
          }}
        >
          PROSEIFY
        </Typography>

        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} color="inherit">
          <LanguageIcon />
        </IconButton>

        <Menu
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {languages.map((language) => (
            <MenuItem key={language} onClick={handleCloseUserMenu}>
              <Typography variant="body1">{language}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
