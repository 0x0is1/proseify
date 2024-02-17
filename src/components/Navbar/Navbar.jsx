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
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
function Navbar({ setLangidx, langidx }) {
  const navigate = useNavigate();
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await APIFetch(`languages`);
      setLanguages(data);
      if (langidx !== null && langidx !== undefined) {
        setSelectedLanguage(data[langidx]); // Set the selected language based on langidx
      }
    };
    fetchData();
  }, [langidx]);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLanguageClick = (index) => {
    setLangidx(index);
    setSelectedLanguage(languages[index]);
    handleCloseUserMenu();
  };

  return (
    <AppBar position="sticky" style={{ backgroundColor: "rgb(32, 128, 136)" }}>
      <Toolbar>
        <AdbIcon sx={{ display: { md: "flex" }, mr: 1 }} />
        <Typography
          onClick={() => navigate("/")}
          variant="h6"
          sx={{
            cursor: "pointer",
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
          }}
        >
          PROSEIFY
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
          <Typography variant="body1" color="inherit">
            {selectedLanguage || "Select Language"}
          </Typography>
        </Box>
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
          {languages.map((language, index) => (
            <MenuItem key={index} onClick={() => handleLanguageClick(index)}>
              <Typography variant="body1">{language}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
