import React from 'react'
import { Badge, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppBarStyle from '../styles/AppBarStyle';
import TemplateDefaultContext from '../stores/TemplateDefault.context';

const HeaderDefault: React.FC = () => {

  const templateDefaultContext = React.useContext(TemplateDefaultContext);
  const {isOpen, toggleDrawer} = templateDefaultContext;

  return <AppBarStyle position="absolute" open={isOpen}>
    <Toolbar sx={{pr: '24px',}}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        sx={{
          marginRight: '36px',
          ...(isOpen && { display: 'none' }),
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        Dashboard
      </Typography>
      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Toolbar>
  </AppBarStyle>
}

export default HeaderDefault;