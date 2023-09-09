import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { useNavigate } from 'react-router-dom';

export default function NavigationBar() {
  const [value, setValue] = React.useState('home');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  return (
    <BottomNavigation
      sx={{ width: 500 }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<RestoreIcon />}
        onClick={() => {
            navigate("/")
        }}
      />
      <BottomNavigationAction
        label="List"
        value="list"
        icon={<FavoriteIcon />}
        onClick={() => {
            navigate("/list")
        }}
      />
      <BottomNavigationAction
        label="Notification"
        value="notification"
        icon={<LocationOnIcon />}
        onClick={() => {
            navigate("/notification")
        }}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<FolderIcon />}
        onClick={() => {
            navigate("/profile")
        }}
      />
    </BottomNavigation>
  );
}