import { Avatar, Box, Button, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

import {
  IconChevronDown,
  IconListCheck,
  IconMail,
  IconPassword,
  IconUser,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import app from "src/constants/app";
import defaultFont from "src/constants/css/font";
import logOutFromBrowser from "src/utils/logOutFromBrowser";

function Profile() {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const navigate = useNavigate();

  return (
    <Box>
      <div
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        onClick={handleClick2}
        className="profile_section"
      >
        <Avatar
          // src="/images/profile/user-1.jpg"
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
        <span style={{ fontFamily: defaultFont }}>John Doe</span>
        <IconChevronDown className="icon" />
      </div>

      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText style={{ fontFamily: defaultFont }}>My Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => navigate("/profile/change-password")}>
          <ListItemIcon>
            <IconPassword width={20} />
          </ListItemIcon>
          <ListItemText style={{ fontFamily: defaultFont }}>Change Password</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText style={{ fontFamily: defaultFont }}>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText style={{ fontFamily: defaultFont }}>My Tasks</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            to={app.auth.login}
            variant="outlined"
            color="primary"
            component={Link}
            fullWidth
            onClick={() => {
              logOutFromBrowser();
              navigate(app.auth.login);
            }}
            style={{ fontFamily: defaultFont }}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
}

export default Profile;
